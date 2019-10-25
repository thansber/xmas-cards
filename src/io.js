const rootKey = '_XMAS_CARDS_';
const props = [
  { name: 'connectionId', initialValue: 1 },
  { name: 'connections', initialValue: [] },
  { name: 'groupId', initialValue: 1 },
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

export const IO = {
  initialize,
};
