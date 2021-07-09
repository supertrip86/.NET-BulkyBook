var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/CoverType/GetAll"
        },
        "columns": [
            {
                "data": "title",
                "width": "60%"
            },
            {
                "data": "id",
                "width": "40%",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a href="/Admin/CoverType/Upsert/${data}" class="btn btn-success text-white control-link">
                                <i class="fas fa-edit"></i> 
                            </a>
                            <a onclick=Delete("/Admin/CoverType/Delete/${data}") class="btn btn-danger text-white control-link">
                                <i class="fas fa-trash-alt"></i> 
                            </a>
                        </div>
                    `;
                }
            }
        ]
    });
}

function Delete(url) {
    Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "delete",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}