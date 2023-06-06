// Get unique values for the desired columns

// {2 : ["M", "F"], 3 : ["RnD", "Engineering", "Design"], 4 : [], 5 : []}

function getUniqueValuesFromColumn() {

    var unique_col_values_dict = {}

    allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        // alert(col_index)
        const rows = document.querySelectorAll("#emp-table > tbody > tr")

        rows.forEach((row) => {
            cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;
            // if the col index is already present in the dict
            if (col_index in unique_col_values_dict) {

                // if the cell value is already present in the array
                if (unique_col_values_dict[col_index].includes(cell_value)) {
                    // alert(cell_value + " is already present in the array : " + unique_col_values_dict[col_index])

                } else {
                    unique_col_values_dict[col_index].push(cell_value)
                    // alert("Array after adding the cell value : " + unique_col_values_dict[col_index])

                }


            } else {
                unique_col_values_dict[col_index] = new Array(cell_value)
            }
        });

        
    });

    for(i in unique_col_values_dict) {
        alert("Column index : " + i + " has Unique values : \n" + unique_col_values_dict[i]);
    }

    updateSelectOptions(unique_col_values_dict)

};

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(unique_col_values_dict) {
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        unique_col_values_dict[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
        });

    });
};


// Create filter_rows() function

// filter_value_dict {2 : Value selected, 4:value, 5: value}

function filter_rows() {
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_dict = {}

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all") {
            filter_value_dict[col_index] = value;
        }
    });

    var col_cell_value_dict = {};

    const rows = document.querySelectorAll("#emp-table tbody tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
        })

        for (var col_i in filter_value_dict) {
            filter_value = filter_value_dict[col_i]
            row_cell_value = col_cell_value_dict[col_i]
            
            if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
                display_row = false;
                break;
            }


        }

        if (display_row == true) {
            row.style.display = "table-row"

        } else {
            row.style.display = "none"

        }





    })

}




// Variables
var currentPage = 1;
var rowsPerPage = 9; // Number of rows to display per page

// Function to display the current page
function displayPage(pageNumber) {
    var tableRows = document.querySelectorAll('#mytable tbody tr');


    // Calculate start and end indexes for the rows to display
    var startIndex = (pageNumber - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;

    // Show/hide table rows based on the current page
    for (var i = 0; i < tableRows.length; i++) {
        if (i >= startIndex && i < endIndex) {
            tableRows[i].style.display = 'table-row';
        } else {
            tableRows[i].style.display = 'none';
        }
    }

    // Update current page indicator
    document.getElementById('current-page').textContent = 'Page ' + pageNumber;
}
/* For Searchable bar In Customer Records */


// Function to navigate to the previous page
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

// Function to navigate to the next page
function goToNextPage() {
    var tableRows = document.querySelectorAll('#mytable tbody tr');
    var totalPages = Math.ceil(tableRows.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
}

// Attach event listeners to pagination buttons
document.getElementById('prev-page').addEventListener('click', goToPreviousPage);
document.getElementById('next-page').addEventListener('click', goToNextPage);

// Display the initial page
displayPage(currentPage);

const searchInput = document.getElementById('searchbar');
const table = document.getElementById('mytable');

// Add event listener for the input keyup event
searchInput.addEventListener('keyup', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    searchTable(searchTerm);
});

// Function to search table data
function searchTable(searchTerm) {
    const rows = table.getElementsByTagName('tr');

    // Loop through all the rows except the header row
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        // Loop through all the cells in the current row
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent.toLowerCase();

            // Check if the cell text contains the search term
            if (cellText.includes(searchTerm)) {
                found = true;
                break;
            }
        }

        // Show/hide the row based on search term match
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
    if (searchTerm.trim() === '') {
        // Reload the page
        location.reload(true);
    }
}




const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});



// Calculate the stroke-dasharray value
const circle = document.getElementById('progress-circle');
const circleLength = 2 * Math.PI * circle.getAttribute('r');
circle.style.strokeDasharray = `${circleLength}`;

// Calculate the stroke-dashoffset value
const roomtypePercentage = roomtypeValue / 100;
const strokeDashoffset = circleLength - (circleLength * roomtypePercentage);
circle.style.strokeDashoffset = `${strokeDashoffset}`;











