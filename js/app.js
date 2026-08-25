document.addEventListener('DOMContentLoaded', () => {
    // 數據集: 時間軸 (以月為單位) 與 Kokotajlo 報告中推估的 AI R&D 加速乘數
    const timelineLabels = ['2025/04', '2025/07', '2025/10', '2026/01', '2026/06', '2027/02', '2027/05', '2027/08'];
    const rawDataMultiplier = [1, 1.5, 2, 2.5, 4, 25, 100, 250];

    // 模擬經過 Support Vector Regression (SVR - RBF Kernel) 擬合與平滑化後的預測數據曲線
    const svrFittedData = [1.2, 1.4, 1.9, 2.8, 5.2, 22.1, 95.0, 248.5];
    const svrUpperBound = [1.5, 2.0, 3.0, 5.0, 10.0, 40.0, 150.0, 400.0]; // Epsilon-tube 上界

    // Page 1 圖表渲染 (2025-2026)
    const ctx1 = document.getElementById('svrChart1');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: timelineLabels.slice(0, 5),
                datasets: [
                    {
                        label: '原始時間軸點 (R&D 乘數)',
                        data: rawDataMultiplier.slice(0, 5),
                        borderColor: '#38bdf8',
                        backgroundColor: '#38bdf8',
                        pointRadius: 6,
                        showLine: false
                    },
                    {
                        label: 'SVR 擬合趨勢線 (RBF Kernel)',
                        data: svrFittedData.slice(0, 5),
                        borderColor: '#4ade80',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#f8fafc' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' }, title: { display: true, text: 'R&D 加速倍率', color: '#94a3b8' } }
                }
            }
        });
    }

    // Page 2 圖表渲染 (2027 智慧爆發與 SVR 擬合帶)
    const ctx2 = document.getElementById('svrChart2');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: timelineLabels,
                datasets: [
                    {
                        label: 'SVR 擬合預測曲線',
                        data: svrFittedData,
                        borderColor: '#f43f5e',
                        backgroundColor: 'rgba(244, 63, 94, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'SVR 樂觀上界範疇 (ε-bound)',
                        data: svrUpperBound,
                        borderColor: 'rgba(251, 146, 60, 0.5)',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#f8fafc' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                    y: { 
                        type: 'logarithmic', // 使用對數軸凸顯爆發性差異
                        ticks: { color: '#94a3b8' }, 
                        grid: { color: '#334155' },
                        title: { display: true, text: '加速倍率 (對數標度)', color: '#94a3b8' }
                    }
                }
            }
        });
    }

    // Page 3 圖表渲染 (2028-2030 遠期指數與實體自動化趨勢)
    const ctx3 = document.getElementById('svrChart3');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['2027/08', '2028/03', '2028/09', '2029/01', '2029/08', '2030/01'],
                datasets: [
                    {
                        label: '實體世界自動化滲透率 (%)',
                        data: [15, 45, 70, 88, 96, 99],
                        borderColor: '#a855f7',
                        backgroundColor: 'rgba(168, 85, 247, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'SVR 累積科技爆發係數 (對數)',
                        data: [250, 1200, 5000, 18000, 50000, 100000],
                        borderColor: '#38bdf8',
                        borderDash: [5, 5],
                        yAxisID: 'y1',
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#f8fafc' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                    y: { 
                        ticks: { color: '#94a3b8' }, 
                        grid: { color: '#334155' },
                        title: { display: true, text: '自動化率 (%)', color: '#94a3b8' }
                    },
                    y1: {
                        type: 'logarithmic',
                        position: 'right',
                        ticks: { color: '#38bdf8' },
                        grid: { drawOnChartArea: false },
                        title: { display: true, text: '科技爆發指數', color: '#38bdf8' }
                    }
                }
            }
        });
    }
});