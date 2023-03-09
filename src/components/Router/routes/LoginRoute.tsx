export default {
  element: () => import('@/components/Login').then((module) => <module.default />),
};
