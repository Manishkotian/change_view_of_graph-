  $scope.colorsArray = ["#4c7ff0","#7fc35c","#f0c54c","#d26d54","#4cc3f0"];

    $scope.drawSubjectDetailsGraph = function(graphType,canvasId){
        if(localStorage.getItem("subjectTypeGraphData")){
            var dataArray = JSON.parse(localStorage.getItem("subjectTypeGraphData"));
            if(dataArray.length == 0){
                $scope.dataExistsForSubjectTypeGraph == false;
            }
            else{
                for(i=0;i<dataArray.length;i++){
                $scope.dataExistsForSubjectTypeGraph = false;
                    if(dataArray[i].count>0){
                        $scope.dataExistsForSubjectTypeGraph = true;
                        if($scope.subjectTypeChart){
                            $scope.subjectTypeChart.destroy();
                        }
                        break;
                    }
                }
            }
            if($scope.dataExistsForSubjectTypeGraph == true){
                document.getElementById("subjectGraph2View").style.innerHTML = '';
                 $scope.graphData ={};
                if(graphType == 0){   //pie chart
                    $scope.graphData = {
                        type: 'pie',
                        data: {
                            datasets: [{
                                data: [],
                                backgroundColor: []
                            }],
                            labels: []
                        },
                        options: {
                            title: {
                                display: true,
                                text: ''
                            }
                        }
                    };
                    $scope.colorsArrayIterator = 0;
                    for(i=0;i<dataArray.length;i++){
                        $scope.graphData.data.labels.push(dataArray[i].featureName);
                        $scope.graphData.data.datasets[0].data.push(dataArray[i].count);
                        if($scope.colorsArrayIterator == $scope.colorsArray.length)
                            $scope.colorsArrayIterator = 0;
                        $scope.graphData.data.datasets[0].backgroundColor.push($scope.colorsArray[$scope.colorsArrayIterator]);
                        $scope.colorsArrayIterator++;
                    }
                    $scope.graphData.options.title.text = "Subject and its details";
                    $scope.subjectTypeGraphCanvas = document.getElementById(canvasId).getContext('2d');
                    $scope.subjectTypeChart = new Chart($scope.subjectTypeGraphCanvas, $scope.graphData);
                }
                else if(graphType == 1){ //bar chart
                    $scope.graphData = {
                        labels: [],
                        datasets: [
                            {   
                                label: [],
                                backgroundColor: [],
                                data: []
                            }
                        ]
                    };
                    $scope.graphDesign = {
                        type: 'bar',
                        data: $scope.graphData,
                        options: {
                            title: {
                                display: true,
                                text: ''
                            },
                            legend: {
                                display: false,
                            },
                            tooltips: {
                                mode: 'label'
                            },
                            scales: {
                                xAxes: [{
                                    barPercentage: 0.3,
                                    scaleLabel: {
                                        display: true,
                                        labelString: ''
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: ''
                                    }
                                }]
                            }
                        }
                    }
                    for(var i=0;i<dataArray.length;i++){
                        $scope.graphData.labels.push(dataArray[i].featureName);
                        $scope.graphData.datasets[0].label.push(dataArray[i].featureName);
                        $scope.graphData.datasets[0].backgroundColor.push($scope.colorsArray[i]);
                        $scope.graphData.datasets[0].data.push(dataArray[i].count);
                        }
                    $scope.graphDesign.options.title.text = "Subject and its details";
                    $scope.graphDesign.options.scales.xAxes[0].scaleLabel.labelString = "Subject-->";
                    $scope.graphDesign.options.scales.yAxes[0].scaleLabel.labelString = "Count-->";
                    $scope.subjectTypeGraphCanvas = document.getElementById(canvasId).getContext('2d');
                    $scope.subjectTypeChart = new Chart($scope.subjectTypeGraphCanvas,$scope.graphDesign);
                }
                else{
                    $scope.graphData = { //line chart
                        labels: [],
                        datasets: [
                            {   
                                label : "",
                                borderColor : "#1ab394",
                                pointRadius : 5,
                                pointHoverBackgroundColor : "#1ab394",
                                pointBackgroundColor : "#1ab394",
                                pointHoverRadius : 10,
                                fill : false,
                                bezierCurve: true,
                                bezierCurveTension: 0.4,
                                data: []
                            }
                        ]
                    };
                    $scope.lineOptions = {
                        scaleShowGridLines: true,
                        scaleGridLineColor: "rgba(0,0,0,.05)",
                        scaleGridLineWidth: 1,
                        bezierCurve: true,
                        bezierCurveTension: 0.4,
                        responsive: true,
                        title: {
                            display: true,
                            text: ''
                        },
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            mode: 'label'
                        },
                        fill : false,
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: ''
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: ''
                                }
                            }]
                        }
                    };
                    for(i=0;i<dataArray.length;i++){
                        $scope.graphData.labels.push(dataArray[i].featureName);
                        $scope.graphData.datasets[0].data.push(dataArray[i].count);
                        $scope.lineOptions.title.text = "Subject and its details";
                        $scope.lineOptions.scales.xAxes[0].scaleLabel.labelString = "Subject-->";
                        $scope.lineOptions.scales.yAxes[0].scaleLabel.labelString = "Count -->";
                        $scope.subjectTypeGraphCanvas = document.getElementById(canvasId).getContext('2d');
                        $scope.subjectTypeChart = new Chart($scope.subjectTypeGraphCanvas,{
                            type : 'line',
                            data : $scope.graphData,
                            options : $scope.lineOptions
                        });
                    }
                }

            }
        }
    }
