const rootPath = 'router';

const paths = {
  pathName: () => [rootPath, 'location', 'pathname'],
  queryParams: () => [rootPath, 'location', 'query'],
};

export default paths;
