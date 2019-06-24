export default {
  element: () => import('@/components/Login/Login').then((module) => <module.default />),
};
