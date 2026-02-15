const cpuCtx = document.getElementById('cpuChart');
const memoryCtx = document.getElementById('memoryChart');
const diskCtx = document.getElementById('diskChart');

const createChart = (ctx, label, color) => new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [label, 'Livre'],
    datasets: [{
      data: [0, 100],
      backgroundColor: [color, '#e0e0e0']
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

const charts = {
  cpu: createChart(cpuCtx, 'CPU', '#f44336'),
  memory: createChart(memoryCtx, 'Memória', '#2196f3'),
  disk: createChart(diskCtx, 'Disco', '#4caf50')
};

async function updateMetrics() {
  const res = await fetch('/api/metrics');
  const data = await res.json();

  charts.cpu.data.datasets[0].data = [data.cpu, 100 - data.cpu];
  charts.memory.data.datasets[0].data = [data.memory, 100 - data.memory];
  charts.disk.data.datasets[0].data = [data.disk, 100 - data.disk];

  Object.values(charts).forEach(c => c.update());
}

setInterval(updateMetrics, 3000);
updateMetrics();
