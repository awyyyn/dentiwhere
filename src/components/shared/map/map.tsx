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
	interactive?: boolean;
	handleChange?: (val: { lat: number; lng: number }, address: string) => void;
	data?: {
		id: number;
		name: string;
		map: {
			lat: number;
			lng: number;
		};
	}[];
}

const OpenStreetMap = ({
	showMarker = false,
	pinning = false,
	handleChange,
	defaultCenter = [123.53506, 13.24104],
	data,
}: OpenStreetMapProps) => {
	const mapContainer = useRef(null);
	const map = useRef<any>(null);
	const [center] = useState(defaultCenter);
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
			debounceSearch: 800,
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
			fullscreenControl: "top-left",
			geolocateControl: true,
			// interactive: interactive,
		})
			.addControl(gc)
			.on("click", async (e) => {
				if (pinning && handleChange) {
					marker.setLngLat(e.lngLat).addTo(map.current);
					const res = await maptiler.geocoding.reverse(
						[e.lngLat.lng, e.lngLat.lat],
						{
							language: "en",
							types: ["region", "country", "subregion"],
							excludeTypes: true,
							limit: 1,
						}
					);
					const placeName =
						res.features.length > 0 ? res.features[0].place_name_en : "";
					handleChange({ lat: e.lngLat.lat, lng: e.lngLat.lng }, placeName);
				}
			});

		console.log("qqqq", data);
		if (data && data.length > 0) {
			const markerHeight = 0,
				markerRadius = 0,
				linearOffset = 0;
			const popupOffsets = {
				top: [0, 0],
				"top-left": [0, 0],
				"top-right": [0, 0],
				bottom: [0, -markerHeight],
				"bottom-left": [
					linearOffset,
					(markerHeight - markerRadius + linearOffset) * -1,
				],
				"bottom-right": [
					-linearOffset,
					(markerHeight - markerRadius + linearOffset) * -1,
				],
				left: [markerRadius, (markerHeight - markerRadius) * -1],
				right: [-markerRadius, (markerHeight - markerRadius) * -1],
			};
			data.map((d) => {
				// new maptiler.Marker({ color: "#ff0000" })
				// 	.setLngLat([d.map.lng, d.map.lat])
				// 	.addTo(map.current);
				new maptiler.Popup({
					offset: popupOffsets as any,
					className: "my-class",
					closeButton: false,
					closeOnClick: false,

					closeOnMove: false,
				})
					.setLngLat([d.map.lng, d.map.lat])
					.setHTML(`<h1>${d.name}</h1>`)
					.setMaxWidth("300px")
					.addTo(map.current);
			});
		}

		if (showMarker) {
			marker.setLngLat(center).addTo(map.current);
		}

		setLoading(false);
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
