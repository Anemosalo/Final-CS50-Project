
document.addEventListener("DOMContentLoaded", () => {
  alert("loaded");

    const sliders =[
        {sliderId:"mean", labelId:"mean-count", labelText:"Mean:"},
        { sliderId: "std", labelId: "std-count", labelText: "Standard Dev:" },
        { sliderId:"bin", labelId:"bin-count", labelText:"Bins:" }
    ]
    sliders.forEach(({sliderId,labelId,labelText}) =>{
        const slider = document.getElementById(sliderId);
        const label = document.getElementById(labelId);
        

        if(!slider || !label)
        {
            console.warn(`Could not find ${sliderId} or ${labelId}`);
        }


        label.innerText = `${labelText} ${slider.value}`;
        console.log(`${labelText} initial:`, slider.value);

        slider.addEventListener("input", ()=> {
            label.innerText= `${labelText} ${slider.value}`;
            console.log(`${labelText} updated:`, slider.value);
        });
    });


    let data = {}; 
    const chart = document.getElementById('chart');
    let DataChart =new Chart(chart, {
                type: 'bar',
                data: {
                labels: [data.label],
                datasets: [{
                    label: 'CHART:',
                    data: [data.value],
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
        });
    const generator = document.getElementById("generator");
    generator.addEventListener("click",()=>{
        let u = Math.random();
        let v = Math.random();
        let z = ((Math.sqrt(-2*Math.log(u)))*(Math.cos(2*Math.PI*v)));
        let m = Number(document.getElementById("mean").value);
        let s = Number(document.getElementById("std").value);

        let x = m + s*z;
        console.log(x);
        let bin = Math.round(x);

        if (data[bin]) {
            data[bin]+=1;
        }
        else {
            data[bin]=1;
        }
        console.log(bin, data[bin]);

        let sortedbins = Object.keys(data);
        sortedbins.sort((a,b)=>a-b);
        let sortedValues = sortedbins.map(bin => data[bin]);

        const ctx = document.getElementById('chart');
        
        DataChart.data.labels = sortedbins;
        DataChart.data.datasets[0].data = sortedValues;
        DataChart.update();

        If (generate new chart):
            const newDataset = {
            label: 'New Dataset',
            data: [new data], // The number of data points must match the labels
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
            };

        // 2. Add the new dataset to the chart
        myChart.data.datasets.push(newDataset);

        // 3. Update the chart to display the new dataset
        myChart.update();


    });




    
   








});