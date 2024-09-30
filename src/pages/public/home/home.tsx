import SearchClinic from "@/components/shared/search-clinic/search-clinic";
import Conditions from "./__components/conditions/conditions";
import Hero from "./__components/hero/hero";
import ListOfClinics from "./__components/list-of-clinics/list-of-clinics";
import QrLink from "./__components/qr-link/qr-link";
import Services from "./__components/services/services";
import PlacesCarousel from "./__components/carousel/carousel";
import ClinicMaps from "./__components/clinic-maps/clinic-maps";

export default function Home() {
	return (
		<>
			<Hero />
			<PlacesCarousel />
			<ClinicMaps />
			<QrLink />
			<ListOfClinics />
			<Conditions />
			<Services />
			<SearchClinic />
		</>
	);
}
