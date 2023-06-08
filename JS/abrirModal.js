$(document).ready(function () {
  // Obtén una referencia al enlace
  const btnAbrirModal = $(".btn-newWrapReg-end a[data-modal]");

  // Agrega un evento clic al enlace
  btnAbrirModal.on("click", function (e) {
    e.preventDefault(); // Evita que se siga el enlace

    // Obtén la ruta del archivo del atributo data-modal del enlace
    const modalURL = $(this).data("modal");

    // Carga el contenido del modal desde el archivo usando AJAX
    $.ajax({
      url: modalURL,
      dataType: "html",
      success: function (data) {
        // Crea el overlay y el modal
        const overlay = $("<div>").addClass("modal-overlay");
        const modal = $("<div>").addClass("modal-content");

        // Agrega el contenido cargado al modal
        modal.html(data);

        // Agrega el overlay y el modal al cuerpo del documento
        $("body").append(overlay, modal);

        // Muestra el overlay y el modal
        overlay.fadeIn();
        modal.fadeIn();
      },
      error: function () {
        console.error("Error al cargar el contenido del modal");
      },
    });
  });

  // Cerrar el modal al hacer clic en el overlay
  $(document).on("click", ".modal-overlay", function () {
    $(".modal-overlay").fadeOut(function () {
      $(this).remove();
    });

    $(".modal-content").fadeOut(function () {
      $(this).remove();
    });
  });
});
