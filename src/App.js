import { useRef, useLayoutEffect } from 'react';
import UserTable from './Components/UserTable';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { chartData } from './data'
am4core.useTheme(am4themes_animated);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const chart = useRef(null);
  const classes = useStyles();

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    let data = [];

    for (var key in chartData.timeoffset_epoch_breath) {
      data.push({ key: key, value: chartData.timeoffset_epoch_breath[key] });
    }

    x.data = data;
    let valueAxis1 = x.xAxes.push(new am4charts.ValueAxis());
    valueAxis1.renderer.minWidth = 35;

    let valueAxis2 = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.name = "Breaths per minute";
    series.dataFields.valueX = "key";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <UserTable />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </Container>
    </div>
  );
}

export default App;
