import { MapNode } from './MapNode';

/**
 * Backtrace from end node through parents and return the path.
 * @param node
 * @param includeStartingNode
 */
export function backtrace(
  node: MapNode,
  includeStartNode: boolean,
  includeEndNode: boolean
): number[][] {
  // Init empty path
  const path: number[][] = [];

  let currentNode: MapNode;
  if (includeEndNode) {
    // Attach the end node to be the current node
    currentNode = node;
  } else {
    currentNode = node.getParent();
  }

  // Loop as long the current node has a parent
  while (currentNode.getParent()) {
    path.push([currentNode.position.x, currentNode.position.y]);
    currentNode = currentNode.getParent();
  }

  // If true we will also include the starting node
  if (includeStartNode) {
    path.push([currentNode.position.x, currentNode.position.y]);
  }

  return path.reverse();
}

export function minBy(arr:MapNode[],func: (n:MapNode)=>number):any{
  let min = 0;
  for(var i = 1; i < arr.length; i++){
    if(func(arr[i]) < func(arr[min])){
      min = i;
    }
  }
  return arr[min];
}

export function remove(arr:any[], node:any){
  let i = arr.indexOf(node);
  if(i >= 0){
    arr.splice(i, 1);
  }
  return arr;
}