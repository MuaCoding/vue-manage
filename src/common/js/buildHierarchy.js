export function buildHierarchy(arry, type) {
  var tree = [],
    children = {};
  // find the top level nodes and hash the children based on parent
  for (var i = 0, len = arry.length; i < len; ++i) {
    var item = arry[i],
      p = item.PID,
      //关键步骤，查找根节点
      target = p === type ? roots : (children[p] || (children[p] = []));

    target.push({
      value: item
    });

  }

  // function to recursively build the tree
  var findChildren = function(parent) {
    if (children[parent.value.ID]) {
      parent.children = children[parent.value.ID];
      for (var i = 0, len = parent.children.length; i < len; ++i) {
        findChildren(parent.children[i]);
      }
    }
  };

  // enumerate through to handle the case where there are multiple roots
  for (var i = 0, len = roots.length; i < len; ++i) {
    findChildren(roots[i]);
  }

  return tree;
}
