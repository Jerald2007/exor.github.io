document.addEventListener("DOMContentLoaded", () => {
    // 1. Element Selection with basic null check
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const reportForm = document.getElementById("reportForm");
    const ticketLog = document.getElementById("ticketLog");

    // Helper function to handle raw strings safely
    function escapeHtml(str) {
        if (!str) return "";
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;");
    }

    // 2. Mobile Sidebar Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

    // Close sidebar when clicking outside on mobile devices
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
            if (sidebar && menuToggle && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
            }
        }
    });

    // 3. Automated Facility Actions Logic
    if (reportForm && ticketLog) {
        reportForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Gather Inputs
            const issueType = document.getElementById("issueType").value;
            const location = document.getElementById("location").value;
            const description = document.getElementById("description").value;

            // Generate Automated Maintenance Solution System
            let actionStrategy = "";
            let structuredIssueName = "";

            if (issueType === "sink") {
                structuredIssueName = "Broken Sink";
                actionStrategy = "Emergency plumbing ticket routed. Deploying automated pressure check & hardware replacements.";
            } else if (issueType === "odor") {
                structuredIssueName = "Foul Restroom Odor";
                actionStrategy = "Routing environmental services. Scheduling drainage line enzyme flush & HVAC air-flow inspection.";
            } else {
                structuredIssueName = "General Repair";
                actionStrategy = "Facility inspector assigned to review structure damage and resource distribution.";
            }

            // Generate Random Ticket ID
            const ticketId = `#GC-${Math.floor(1000 + Math.random() * 9000)}`;

            // Construct New Row Dynamic Node
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${ticketId}</td>
                <td><strong>${structuredIssueName}</strong></td>
                <td>${escapeHtml(location)}</td>
                <td>${actionStrategy}</td>
                <td><span class="badge badge-warning">In Progress</span></td>
            `;

            // Prepend to top of the live tracking sheet
            ticketLog.insertBefore(newRow, ticketLog.firstChild);

            // Reset form variables and notify user
            reportForm.reset();
            alert(`Success! Ticket ${ticketId} generated. The technical maintenance strategy has been deployed.`);
        });
    }
});