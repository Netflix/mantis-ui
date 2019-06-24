export default function(to, _from, _next) {
  const nearestRouteWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  if (nearestRouteWithTitle) {
    document.title = nearestRouteWithTitle.meta.title;
  }
}
