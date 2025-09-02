
document.addEventListener("DOMContentLoaded", () => {
     alert("loaded");
//
//
//
//
//     
//             Initialize Sample Number
    let sampleNum = 0;
//             Get the sliders to update dynamicly:
    const sliders =[
        {sliderId:"mean", labelId:"mean-count", labelText:"Mean:"},
        { sliderId: "std", labelId: "std-count", labelText: "Standard Dev:" }
        
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
            UpdateCharts();
        });
    });
//
//
//
//
//
//
//
//      Data structure which stores the samples
    let data = {}; 
////    Make the charts
    const chart = document.getElementById('chart');
    let DataChart =new Chart(chart, {
                type: 'bar',
                data: {
                labels: [data.label],
                datasets: [{
                    // Bars Chart:
                    label: 'Chart',
                    data: [data.value],
                    borderWidth: 1,
                    backgroundColor: 'rgba(21, 2, 54, 0.5)',
                    barPercentage:1.0,
                    categoryPercentage:1.0
                    },
                    {
                    // Line Graph:
                    label: 'Line Graph',
                    data: [],
                    type:'line',
                    borderColor:'rgba(0, 80, 165, 1)',
                    borderWidth:2,
                    fill:false,
                    tension: 0.1,
                    pointRadius:0
                    },
                    {
                    //  Actual PDF based on the parameters
                        label:'PDF',
                        data:[],
                        type:"line",
                        borderColor: "rgba(0, 0, 0, 1)",
                        borderWidth:2,
                        borderDash:[5,5],
                        fill:false,
                        tension:0.1,
                        pointRadius:0,
                        // seperate y axis form others
                        yAxisID: 'y-pdf-axis'
                    }
                ],
                options: {
                    // set that seperate axis:
                        scales: {
                                y: { beginAtZero: true},
                                'y-pdf-axis':{
                                    beginAtZero:true,
                                    grid:{
                                        drawOnChartArea: false,
                                    }
                                }
                                }
                        }
                
                }
     
        });

    
//             Getting input/outpout components from/for html
    let sampleCounter= document.getElementById("sampleCounter");
    const generator = document.getElementById("generator");
    let sample= document.getElementById("sample")


    //
    //
    //              Update the charts when buttons are clicked:
    //                  Sort bins , Get m-s-totalSamples values , make the calculations for Scaled/Unscaled Data --> Update charts 
    //             
    function UpdateCharts(){
        let m = Number(document.getElementById("mean").value);
        let s = Number(document.getElementById("std").value);

       
    
        const min =m-s*5;
        const max=m+s*5;
        const AllPossibleBins=[];
        for( let x=min; x<=max; x++){
            AllPossibleBins.push(x.toString());
         }
        let barData = AllPossibleBins.map(label=>data[label] || 0);
        
    
        
        let totalSamples = Object.values(data).reduce((sum, value) => sum + value, 0);

        const UnscanledPerfectData = AllPossibleBins.map(x=>{
            const Factor = 1/(s*Math.sqrt(2*Math.PI));
            const exp = -0.5 * Math.pow((x-m)/s,2);
            return Factor * Math.exp(exp)*totalSamples;
        });


        const ScaledPerfectData = AllPossibleBins.map(x=>{
            const Factor = 1/(s*Math.sqrt(2*Math.PI));
            const exp = -0.5 * Math.pow((x-m)/s,2);
            return Factor * Math.exp(exp);
        })

        DataChart.data.labels= AllPossibleBins;
        DataChart.data.datasets[0].data=barData;
        DataChart.data.datasets[1].data = UnscanledPerfectData;
        DataChart.data.datasets[2].data = ScaledPerfectData;
        const maxY = Math.max(UnscanledPerfectData)*1;
        DataChart.options.scales.y.suggestedMax = maxY;
        DataChart.update();


    }



    //
    //
    //              Generation of Samples drawn from PDF based on dynamic S and M
    //                  get random numbers->use the Box-Muller transform--> update samples/bins--> sort bins--> Update charts
    //
    //

    function generateSample(){

        let u = Math.random();
        let v = Math.random();
        let z = ((Math.sqrt(-2*Math.log(u)))*(Math.cos(2*Math.PI*v)));
        let m = Number(document.getElementById("mean").value);
        let s = Number(document.getElementById("std").value);

        let x = m + s*z;    
        console.log(x);
        x = Math.ceil(x*100)/100;
        sampleNum +=1;
        sampleCounter.innerText= `Number of Samples: ${sampleNum}`;
        sample.innerText=`Sample Value: ${x}`;
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
        UpdateCharts();

    }

//
//
//          Call the Sample Generation Function based when clicking the buttons(not for !Generating=True)
//              
//
    generator.addEventListener("click",generateSample);
   
    let Generating = false;
    let IntervalId = null;


    const toggleButton= document.getElementById("Toggle");
    toggleButton.addEventListener("click", ()=>{
        if (Generating){
            Generating= false;
            clearInterval(IntervalId);
            toggleButton.innerText="Auto-Generate!";
        }
        else{
            IntervalId = setInterval(generateSample,1);
            Generating = true;
            toggleButton.innerText= "Stop Generating";
        }
    });






    UpdateCharts();
    let reset = document.getElementById("reset");
    reset.addEventListener("click",()=> {
        data={};
        sampleNum=0;
        sampleCounter.innerText= `Number of Samples: 0`;
        DataChart.data.labels = []; 
        DataChart.data.datasets[0].data = []; 
        DataChart.data.datasets[1].data = []; 
        DataChart.data.datasets[2].data = [];
        if (Generating) {
            clearInterval(IntervalId);
            Generating = false;
            toggleButton.innerText = "Auto-Generate!";
        }
        DataChart.update();
    })
});

