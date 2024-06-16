// script.js
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const confirmBtn = document.getElementById('confirmBtn');
    let users = [];

    function validateEmailUnique(email) {
        return !users.some(user => user.email === email);
    }

    function validateAge(fechaNacimiento, fechaIngreso) {
        const birthDate = new Date(fechaNacimiento);
        const joinDate = new Date(fechaIngreso);
        const age = (joinDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
        return age >= 18;
    }

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;
        const fechaIngreso = document.getElementById('fechaIngreso').value;

        if (!validateEmailUnique(email)) {
            alert('El correo electrónico ya está registrado.');
            return;
        }

        if (!validateAge(fechaNacimiento, fechaIngreso)) {
            alert('El trabajador debe tener al menos 18 años en la fecha de ingreso.');
            return;
        }

        const modalBody = document.querySelector('#confirmModal .modal-body');
        modalBody.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Correo Electrónico:</strong> ${email}</p>
            <p><strong>Cargo:</strong> ${cargo}</p>
            <p><strong>Fecha de Ingreso:</strong> ${fechaIngreso}</p>
        `;

        confirmModal.show();

        confirmBtn.onclick = function() {
            users.push({ nombre, apellido, email, cargo, fechaIngreso });
            addUserToList({ nombre, apellido, email, cargo, fechaIngreso });
            confirmModal.hide();
            userForm.reset();
        };
    });

    function addUserToList(user) {
        const userCard = document.createElement('div');
        userCard.classList.add('col-md-3', 'user-card');
        userCard.innerHTML = `
            <p><strong>${user.nombre} ${user.apellido}</strong></p>
            <p>${user.email}</p>
            <p>${user.cargo}</p>
            <p>${user.fechaIngreso}</p>
            <button class="btn btn-danger btn-sm">Eliminar</button>
        `;
        userCard.querySelector('button').addEventListener('click', function() {
            userList.removeChild(userCard);
            users = users.filter(u => u.email !== user.email);
        });
        userList.appendChild(userCard);
    }
});
