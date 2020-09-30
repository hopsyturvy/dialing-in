var dragSrcEl = null;
var answers = [
    "Make a shot with correct dose and yield",
    "Check the shot time",
    "Adjust the grind size accordingly",
    "Purge the grinder",
    "Repeat until the shot time is correct",
    "Check the dose given by the grinder",
    "Adjust the grind time accordingly",
    "Repeat until the dose is correct"
];
var random = [6,
    0,
    5,
    1,
    7,
    2,
    4,
    3,
    10,
    9,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

for (var i = 0; i < (answers.length); i++) {

    var node = document.createElement("LI");
    var textnode = document.createTextNode(answers[random[i]]);
    node.appendChild(textnode);
    node.className = "column"
    node.setAttribute('draggable', 'true')
    document.getElementById("columns").insertBefore(node, document.getElementById("hidden"));
}

function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        //alert(this.outerHTML);
        //dragSrcEl.innerHTML = this.innerHTML;
        //this.innerHTML = e.dataTransfer.getData('text/html');
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);

    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.classList.remove('over');
    this.classList.remove('dragElem');
    checkanswer();

    /*[].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });*/
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, addDnDHandlers);

function checkanswer() {

    let checks = document.getElementsByClassName("column");
    for (var i = 0; i < (answers.length); i++) {

        if (checks[i].innerHTML == answers[i]) {
            continue;
        } else {
            return;
        }

    }
    document.getElementById("answer").style.visibility = "visible";
    document.getElementById("list").style.pointerEvents = "none";
    
}
