// Sample user data for demonstration
const users = [
    { id: 1, email: "user1@example.com", role: "user" },
    { id: 2, email: "user2@example.com", role: "admin" },
    { id: 3, email: "user3@example.com", role: "user" },
];

// Function to populate the user table
function populateUserTable() {
    const userTableBody = document.getElementById("user-table-body");
    userTableBody.innerHTML = ""; // Clear existing rows

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.email}</td>
                <td id="role-${user.id}">${user.role}</td>
                <td>
                    <select class="form-control" onchange="changeRole(${user.id}, this.value)">
                        <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-warning" onclick="updateRole(${user.id})">Update Role</button>
                </td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });
}

// Function to change the role in the dropdown
function changeRole(userId, newRole) {
    const roleCell = document.getElementById(`role-${userId}`);
    roleCell.innerText = newRole;
}

// Function to update the user's role
function updateRole(userId) {
    const selectedRole = document.querySelector(`select[onchange*="${userId}"]`).value;

    // Make an API call to update the user's role on the server
    fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: selectedRole })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Role updated:', data);
        alert('Role updated successfully!');
        
        // Optionally, update the UI with the new role
        changeRole(userId, selectedRole);
    })
    .catch(error => {
        console.error('Error updating role:', error);
        alert('Failed to update role.');
    });
}

// Populate the user table when the page loads
window.onload = populateUserTable;