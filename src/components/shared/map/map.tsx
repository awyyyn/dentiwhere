import { memo, useEffect, useRef, useState } from "react";
import * as maptiler from "@maptiler/sdk";
import "@maptiler/sdk/style.css";
import "./map.css";
import { environment } from "@/environments/envronment.dev";

const MapDemo = () => {
	const mapContainer = useRef(null);
	const map = useRef<any>(null);
	const [center] = useState({ lng: 13.24104, lat: 123.53506 });

	useEffect(() => {
		if (!map.current) return;
		const geoControl = new maptiler.MaptilerGeolocateControl({});
		const marker = new maptiler.Marker({});
		map.current = new maptiler.Map({
			container: mapContainer.current!,
			style: maptiler.MapStyle.OPENSTREETMAP,
			center: [center.lat, center.lng],
			apiKey: environment.maptilerApiKey,
			maptilerLogo: false,
			zoom: 14,
			terrainControl: true,
			scaleControl: true,
			fullscreenControl: "top-left",
			geolocateControl: true,
		})
			.addControl(geoControl)
			.on("click", (e) => {
				marker.setLngLat(e.lngLat).addTo(map.current);
			});
	}, [center]);

	return (
		<div className="map-wrap">
			<h1>Map</h1>
			<div ref={mapContainer} className="map">
				<div ref={map} />
			</div>
		</div>
	);
};

export default memo(MapDemo);
