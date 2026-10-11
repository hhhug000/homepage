async function fetchTodayCodingTime() {
    const todayStr = new Date().toISOString().split('T')[0];
    const startDate = `${todayStr}T00:00:00Z`;
    const endDate = `${todayStr}T23:59:59Z`;

    const url = `https://hackatime.hackclub.com/api/v1/users/hug0/stats?start_date=${startDate}&end_date=${endDate}&total_seconds=true`;

    try {
        const response = await fetch(url);
        const json = await response.json();

        console.log("Today's Total Seconds Response:", json);

        const totalSeconds = json?.total_seconds || 0;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const text = `${hours}h ${minutes}m`;
        
        const element = document.getElementById('coding-status');
        if (element) {
            element.textContent = text;
        }

        return text;
    } catch (error) {
        console.error("Failed to fetch coding stats:", error);
    }
}

fetchTodayCodingTime();