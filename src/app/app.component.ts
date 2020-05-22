import { Component } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private chart: am4maps.MapChart;

  ngAfterViewInit() {
    this.chart = am4core.create("chartdiv", am4maps.MapChart); // Create map instance
    this.chart.geodata = am4geodata_worldLow; // Set map definition
    this.chart.projection = new am4maps.projections.Miller(); // Set projection
      
    //Creating polygon series and loading data
    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries()); // Create map polygon series
    polygonSeries.exclude = ["AQ"]; // Exclude Antartica
    polygonSeries.useGeodata = true; // Make map to load polygon data from GeoJSON

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template; // Get template for polygon series
    polygonTemplate.tooltipText = "{name}"; // Set tooltiptext property
    polygonTemplate.polygon.fillOpacity = 0.6; // Set fill opacity property
    polygonTemplate.fill = am4core.color("#74B267"); // Set fill property
    let hs = polygonTemplate.states.create("hover");  // Create hover state
    hs.properties.fill = am4core.color("#74X999"); // Set alternative fill color on hover
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
