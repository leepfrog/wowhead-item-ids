const elementId = "wowhead-item-list";

function createElement() {
  const itemContainer = document.createElement("div");
  itemContainer.textContent = "";
  itemContainer.style =
    "z-index: 5000; position: absolute; top: 0; left: 0; background: black; border: 1px solid white; color: white; font-size: 10px; padding: 4px;";
  itemContainer.id = elementId;

  return itemContainer;
}

function stringToDisplay() {
  const listview = document.getElementsByClassName("listview-mode-default")[0];

  if (typeof listview === "undefined") {
    return "No items displayed on this page.";
  }

  const itemString = getItemString(listview);

  return `${itemString}`;
}

function getItemString(listview) {
  const expected = /.+wowhead\.com\/item=(\d+)/;
  const itemLinks = [...listview.getElementsByTagName("a")];
  const hrefs = itemLinks.map(x => x.href);
  const itemIds = hrefs
    .map(href => {
      const match = expected.exec(href);

      if (match) {
        return match[1];
      }

      return null;
    })
    .filter(x => x !== null);

  const uniqueIds = itemIds.filter((item, i, ar) => {
    return ar.indexOf(item) === i;
  });

  const itemStrings = uniqueIds.map(x => `i:${x}`);

  return itemStrings.join(",");
}

function main() {
  let element = document.getElementById(elementId);

  if (element === null) {
    element = createElement();
    document.body.appendChild(element);
  }

  element.textContent = stringToDisplay();
}

main();
