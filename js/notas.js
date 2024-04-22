document.addEventListener("DOMContentLoaded", function() {
       
    var notasData = JSON.parse(localStorage.getItem("notas")).notas; 
      
   
    if (notasData && notasData.length > 0) {
        var tbody = document.getElementById("notasBody");
        var totalCredits = 0;
        var weightedSum = 0;
    
        
        notasData.forEach(function(nota) {
            var row = document.createElement("tr");
            var finalGrade = ((parseFloat(nota.n1) + parseFloat(nota.n2) + parseFloat(nota.n3)) / 3) * 0.7 + parseFloat(nota.ex) * 0.3;
            
            row.innerHTML = `
                <td>${nota.asignatura}</td>
                <td>${nota.creditos}</td>
                <td>${nota.n1}</td>
                <td>${nota.n2}</td>
                <td>${nota.n3}</td>
                <td>${nota.ex}</td>
                <td>${finalGrade.toFixed(2)}</td>
            `;
            tbody.appendChild(row);

            
            totalCredits += parseInt(nota.creditos);
            weightedSum += finalGrade * parseInt(nota.creditos);
        });

        // Calculate the weighted average of the student's grades
        var weightedAverage = weightedSum / totalCredits;

        // Display the weighted average in the header
        var nombreUsuario = document.getElementById("nombreUsuario");
        nombreUsuario.innerHTML = `Promedio Ponderado: ${weightedAverage.toFixed(2)}`;
    } else {
        // Si no hay notas, mostrar un mensaje
        var tbody = document.getElementById("notasBody");
        tbody.innerHTML = "<tr><td colspan='7'>No hay notas disponibles</td></tr>";

        // Mostrar el mensaje de promedio ponderado en el encabezado
        var nombreUsuario = document.getElementById("nombreUsuario");
        nombreUsuario.innerHTML = "Promedio Ponderado: No disponible";
    }
  
    // Agregar evento al botón de cerrar sesión
    var cerrarSesionBtn = document.getElementById("cerrarSesion");
    cerrarSesionBtn.addEventListener("click", function() {
        // Limpiar el localStorage y redirigir al usuario a la página de inicio de sesión
        localStorage.clear();
        window.location.href = "index.html"; // Reemplaza 'index.html' con la URL correcta de tu página de inicio de sesión
    });
});

  