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

const newConnection = name => {
  const data = read();
  const nextConnectionId = data.connectionId + 1;
  write({
    connectionId: nextConnectionId,
    connections: [
      ...data.connections,
      {
        id: data.connectionId + 1,
        name,
        ping: {
          year: data.currentYear,
        },
      },
    ],
  });
};

export const IO = {
  initialize,
  newConnection,
};
