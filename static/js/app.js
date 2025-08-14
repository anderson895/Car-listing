$(document).ready(function () {
  loadCars(); // load all cars initially

  // Load Cars
  function loadCars(search = "") {
    Swal.fire({
      title: "Loading cars...",
      html: "Please wait while we fetch the data.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    $.get("/cars", function (data) {
      let cards = "";
      data
        .filter(car =>
          car.car_name.toLowerCase().includes(search.toLowerCase()) ||
          car.car_description.toLowerCase().includes(search.toLowerCase()) ||
          car.car_category.toLowerCase().includes(search.toLowerCase())
        )
        .forEach(car => {
          cards += `
            <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img src="${car.car_image}" 
                  alt="${car.car_name}" 
                  class="w-full h-40 object-cover"
                  onerror="this.onerror=null; this.src='/static/images/default.png';">
              <div class="p-4">
                  <h2 class="text-lg font-bold">${car.car_name}</h2>
                  <p class="text-gray-600 text-sm">${car.car_description}</p>
                  <span class="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mt-2">${car.car_category}</span>
                  <div class="mt-4 flex gap-2">
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded text-sm editBtn" data-id="${car.car_id}">Edit</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded text-sm deleteBtn" data-id="${car.car_id}">Delete</button>
                  </div>
              </div>
            </div>
          `;
        });

      $("#carsContainer").html(cards);
      Swal.close(); // Close loading modal
    }).fail(function () {
      Swal.fire("Error", "Unable to load cars.", "error");
    });
  }

  // Search only when clicking the button or pressing enter
  $("#searchBtn").on("click", function () {
    let searchValue = $("#search").val();
    loadCars(searchValue);
  });

  $("#searchForm").on("submit", function (e) {
    e.preventDefault();
    let searchValue = $("#search").val();
    loadCars(searchValue);
  });

  // Save Car (Add/Update)
  $("#carForm").on("submit", function (e) {
    e.preventDefault();

    let carName = $("#car_name").val().trim();
    let carDesc = $("#car_description").val().trim();
    let carCat = $("#car_category").val().trim();
    let carImg = $("#car_image").val().trim();

    // Validation
    if (!carName || !carDesc || !carCat || !carImg) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields before saving.",
      });
      return;
    }

    let carData = {
      car_name: carName,
      car_description: carDesc,
      car_category: carCat,
      car_image: carImg
    };
    let carId = $("#car_id").val();
    let ajaxOptions = {
      contentType: "application/json",
      data: JSON.stringify(carData),
      beforeSend: function () {
        Swal.fire({
          title: "Processing...",
          html: "Please wait while we save the car.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
      },
      success: function () {
        Swal.fire("Success", "Car saved successfully!", "success");
        loadCars();
        $("#carForm")[0].reset();
        $("#car_id").val("");
      },
      error: function () {
        Swal.fire("Error", "Something went wrong while saving the car.", "error");
      }
    };

    if (carId) {
      ajaxOptions.url = `/cars/${carId}`;
      ajaxOptions.type = "PUT";
    } else {
      ajaxOptions.url = "/cars";
      ajaxOptions.type = "POST";
    }

    $.ajax(ajaxOptions);
  });

  // Edit Car
  $(document).on("click", ".editBtn", function () {
    let id = $(this).data("id");
    $.get(`/cars/${id}`, function (car) {
      $("#car_id").val(car.car_id);
      $("#car_name").val(car.car_name);
      $("#car_description").val(car.car_description);
      $("#car_category").val(car.car_category);
      $("#car_image").val(car.car_image);
    });
  });

  // Delete Car
  $(document).on("click", ".deleteBtn", function () {
    let id = $(this).data("id");
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `/cars/${id}`,
          type: "DELETE",
          beforeSend: function () {
            Swal.fire({
              title: "Deleting...",
              html: "Please wait while we delete the car.",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });
          },
          success: function () {
            Swal.fire("Deleted!", "Car has been deleted.", "success");
            loadCars();
          },
          error: function () {
            Swal.fire("Error", "Unable to delete the car.", "error");
          }
        });
      }
    });
  });
});
