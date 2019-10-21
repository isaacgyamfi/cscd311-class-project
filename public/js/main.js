const removeBlockBtn = document.getElementById('removeBlock');
const addBlockDiv = document.getElementById('addBlockDiv');
const numOfBlocksDiv = document.getElementById('numOfBlocks');

let numOfBlocks;
numOfBlocksDiv.addEventListener('change', () => {
  numOfBlocks = numOfBlocksDiv.value;
  console.log(numOfBlocks);
});

function addAnotherBlock(event) {
  event.preventDefault();
  let newBlockDiv = document.createElement('div');
  newBlockDiv.innerHTML = `
    <div id="addBlockDiv" class="form-row col-md-12">
        <div class="col-md-5 form-group">
            <input placeholder="Block name/number" class="form-control" type="text" name="block${numOfBlocks}" id="block${numOfBlocks}">
        </div>
        <div class="col-md-5 form-group">
            <input placeholder="Number of rooms available for booking" class="form-control" type="number"
                name="numOfRooms${numOfBlocks}" id="numOfRooms${numOfBlocks}">
        </div>
        <div class="col-md-2">
            <button id="removeBlock" onclick="removeBlock(event)" class="btn btn-danger">Remove block</button>
        </div>
    </div>
    <hr>
    `;
  addBlockDiv.parentNode.parentNode.append(newBlockDiv);
}

function removeBlock(event) {
  event.preventDefault();
  addBlockDiv.remove();
}
