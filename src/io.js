const rootKey = '_XMAS_CARDS_';
const props = [
  { name: 'connectionId', initialValue: 0 },
  { name: 'connections', initialValue: [] },
  // eslint-disable-next-line no-undef
  { name: 'currentYear', initialValue: dayjs().year() },
  { name: 'groupId', initialValue: 0 },
  { name: 'groups', initialValue: [] },
];

const read = () => JSON.parse(localStorage.getItem(rootKey) || '{}');

const write = changes => {
  localStorage.setItem(rootKey, JSON.stringify({ ...read(), ...changes }));
};

const initialize = () => {
  const data = read();
  props.forEach(prop => {
    if (data[prop.name] === undefined) {
      data[prop.name] = prop.initialValue;
    }
  });
  write(data);
};

const addConnectionToGroup = (connectionId, groupId) => {
  const group = findGroup(groupId);
  if (!group) {
    console.error(`No group found with ID: ${groupId}`);
    return;
  }

  const updated = read().groups.map(group => {
    if (group.id !== groupId) {
      return group;
    }

    return {
      ...group,
      connections: [...group.connections, connectionId],
    };
  });

  write({ groups: updated });
};

const autoPopulate = () => {
  newConnection('Parents');
  newConnection('Aunt Lisa');
  newConnection('In-Laws');
};

const createDefaultGroup = connectionId => {
  const defaultGroup = findDefaultGroup();
  const defaultGroupId = defaultGroup ? defaultGroup.id : newGroup('My Connections', true);
  addConnectionToGroup(connectionId, defaultGroupId);
};

const deleteConnection = connectionId => {
  const data = read();
  const index = findConnectionIndex(connectionId);
  write({
    connections: [...data.connections.slice(0, index), ...data.connections.slice(index + 1)],
    groups: data.groups.map(group => ({
      ...group,
      connections: group.connections.filter(
        groupConnectionId => groupConnectionId !== connectionId,
      ),
    })),
  });
};

const findConnection = connectionId =>
  read().connections.find(connection => connection.id === connectionId);
const findConnectionIndex = connectionId =>
  read().connections.findIndex(connection => connection.id === connectionId);
const findDefaultGroup = () => read().groups.find(group => group.isDefault);
const findGroup = groupId => read().groups.find(group => group.id === groupId);

const newConnection = (name, groupId = 0) => {
  const data = read();
  const nextId = data.connectionId + 1;

  createDefaultGroup(nextId);

  write({
    connectionId: nextId,
    connections: [
      ...data.connections,
      {
        id: nextId,
        name,
        pings: [
          {
            year: data.currentYear,
          },
        ],
      },
    ],
  });
};

const newGroup = (name, isDefault = false) => {
  const data = read();
  const nextId = data.groupId + 1;
  write({
    groupId: nextId,
    groups: [
      ...data.groups,
      {
        id: nextId,
        name,
        connections: [],
        isDefault,
      },
    ],
  });

  return nextId;
};

const nukeEverything = () => {
  localStorage.setItem(rootKey, JSON.stringify({}));
  initialize();
};

const renameConnection = (connectionId, newName) => {
  const connection = findConnection(connectionId);
  if (!connection) {
    throw new Error(
      `While renaming connection [${connectionId}] to [${newName}], unable to find connection`,
    );
  }

  updateConnection({
    ...connection,
    name: newName,
  });
};

const togglePing = detail => {
  const connection = findConnection(detail.connectionId);
  const errorMsg = msg =>
    `While updating [${detail.property}] for year [${detail.year}] and connection [${detail.connectionId}], ${msg}`;

  if (!connection) {
    throw new Error(errorMsg(`unable to find connection`));
  }

  const ping = connection.pings.find(p => p.year === detail.year);
  if (!ping) {
    throw new Error(errorMsg(`unable to find ping year`));
  }

  ping[detail.property] = !ping[detail.property];
  updateConnection(connection);
};

const updateConnection = updated => {
  const connections = read().connections;
  const index = findConnectionIndex(updated.id);
  write({
    connections: [...connections.slice(0, index), updated, ...connections.slice(index + 1)],
  });
};

export const IO = {
  autoPopulate,
  deleteConnection,
  findConnection,
  initialize,
  newConnection,
  newGroup,
  nukeEverything,
  read,
  renameConnection,
  togglePing,
};
