import { memo, useEffect, useRef, useState } from "react";
import * as maptiler from "@maptiler/sdk";
import "@maptiler/sdk/style.css";
import "./map.css";
import { environment } from "@/environments/envronment.dev";

import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";
import { Loader } from "../loader/loader";

interface OpenStreetMapProps {
	pinning?: boolean;
	defaultCenter?: [number, number];
	showMarker?: boolean;
	handleChange?: (val: { lat: number; lng: number }) => void;
}

const OpenStreetMap = ({
	showMarker = false,
	pinning = false,
	handleChange,
	defaultCenter = [123.53506, 13.24104],
}: OpenStreetMapProps) => {
	const mapContainer = useRef(null);
	const map = useRef<any>(null);
	const [center, setCenter] = useState(defaultCenter);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (!map.current) return;
		// const geoControl = new maptiler.MaptilerGeolocateControl({});
		const marker = new maptiler.Marker({});

		const gc = new GeocodingControl({
			class: `${pinning ? "block" : "hidden"}`,
			country: "ph",
			proximity: [{ type: "map-center" }],
			noResultsMessage: "Not found",
			marker: false,
			bbox: [123.210297, 13.006565, 123.64151, 13.318803],
			// 123.210297,13.006565,123.641510,13.318803
			excludeTypes: true,
			types: ["region", "country", "subregion"],
		});

		map.current = new maptiler.Map({
			container: mapContainer.current!,
			style: maptiler.MapStyle.OPENSTREETMAP,
			center,
			// bounds: [123.210297, 13.006565, 123.64151, 13.318803],
			minZoom: 10,
			apiKey: environment.maptilerApiKey,
			maptilerLogo: false,
			zoom: showMarker ? 17 : 14,
			terrainControl: true,
			scaleControl: true,
			geolocate: "POINT",
			fullscreenControl: "bottom-left",
			geolocateControl: true,
		})
			.addControl(gc)
			.on("click", (e) => {
				if (pinning && handleChange) {
					marker.setLngLat(e.lngLat).addTo(map.current);
					handleChange({ lat: e.lngLat.lat, lng: e.lngLat.lng });
				}
			});
		if (showMarker) {
			marker.setLngLat(center).addTo(map.current);
		}

		setLoading(false);
		return () => map.current.remove();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="map-wrap">
			<div className="relative">
				<div ref={mapContainer} className="map">
					<div ref={map} />
				</div>
			</div>
		</div>
	);
};

export default memo(OpenStreetMap);
