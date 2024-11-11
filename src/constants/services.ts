import Diastema from "@/assets/images/services/service-1.png";
import RootCanal from "@/assets/images/services/service-2.png";
import DentalCrown from "@/assets/images/services/service-3.png";
import ToothFilling from "@/assets/images/services/service-4.png";
import FullDentures from "@/assets/images/services/service-5.png";
import Braces from "@/assets/images/services/service-6.png";

export const services = [
	{
		title: "Tooth extraction",
		description:
			"Tooth extraction is a dental procedure that involves removing a tooth from its socket in the jawbone, often due to severe decay, damage, or overcrowding.",
		/* 
            The process begins with a thorough assessment and usually involves taking X-rays to evaluate the tooth and its surrounding structures. Local anesthesia is then administered to numb the area, ensuring the patient is comfortable and pain-free during the procedure. The dentist uses specialized tools to loosen and extract the tooth carefully. Post-procedure, patients may experience swelling or discomfort, which can be managed with prescribed medications and by following aftercare instructions provided by the dentist. Proper care and adherence to these guidelines are crucial for a smooth recovery and to avoid potential complications.
        */
		img: Diastema,
	},
	{
		title: "Root canal",
		description:
			"A root canal is a dental procedure designed to treat infection or damage within the pulp of a tooth, which is the innermost soft tissue containing nerves and blood vessels.",
		/* 
            The process involves removing the infected or damaged pulp, thoroughly cleaning and disinfecting the root canals, and then filling them with a biocompatible material to seal the space. This procedure helps save the tooth and alleviate pain caused by the infection or damage. After the root canal, the tooth is typically restored with a crown or filling to ensure its strength and functionality. The procedure is generally performed under local anesthesia to ensure patient comfort.
        */
		img: RootCanal,
	},
	{
		title: "Dental crown",
		description:
			"A dental crown is a cap placed over a tooth to restore its shape, size, strength, and appearance. It is typically used when a tooth is severely damaged, decayed, or after a root canal procedure.",
		/* 
            The crown covers the entire visible part of the tooth, providing protection and enhancing its function. To place a crown, the dentist first prepares the tooth by removing any damaged or decayed parts and shaping it to fit the crown. An impression of the tooth is then taken to create a custom-fitted crown, which is usually made from materials like porcelain, metal, or a combination of both. Once the crown is ready, it is cemented onto the prepared tooth, restoring its original function and appearance.
        */
		img: DentalCrown,
	},
	{
		title: "Tooth filling",
		description:
			"A tooth filling is a dental treatment used to repair a cavity or a small area of decay in a tooth.",
		/* 
             The process involves removing the decayed portion of the tooth and then filling the empty space with a material that restores the tooth's structure and function. The filling material, which can be made from materials such as amalgam, composite resin, glass ionomer, or gold, is applied in layers and shaped to match the tooth's natural contours. Once the filling material is in place, it is hardened and polished to ensure a smooth finish. Tooth fillings help prevent further decay and restore the tooth's ability to chew and function normally.
        */
		img: ToothFilling,
	},
	{
		title: "Full dentures",
		description:
			"Full dentures replace all missing teeth in either the upper or lower jaw, featuring a complete set of artificial teeth set in a pink acrylic base that mimics the gums.",
		/* 
            They are removable for cleaning and sleeping. Partial dentures, on the other hand, are used when some natural teeth remain, consisting of artificial teeth attached to a metal or acrylic framework that clasps onto the remaining teeth. Both types of dentures restore oral function, improve speech and appearance, and are custom-made for a comfortable fit.
        */
		img: FullDentures,
	},
	{
		title: "Braces",
		description:
			"Braces are orthodontic devices used to correct misaligned teeth and jaws, improving both dental function and appearance.",
		/* 
            They consist of metal or ceramic brackets attached to the teeth, connected by wires that apply gentle pressure to gradually shift the teeth into their proper positions. Braces can also include rubber bands or other accessories to assist with alignment. The treatment typically involves regular adjustments by an orthodontist to ensure the teeth move as planned. Braces help address issues such as overcrowding, gaps, and bite problems, leading to a more balanced and attractive smile.
        */
		img: Braces,
	},
];

export const servicesChoices = {
	"General Dentistry": [
		"Routine check-ups and cleanings",
		"Oral health screenings",
		"Dental fillings",
		"Preventive treatments (e.g., fluoride, sealants)",
		"Dental X-rays",
	],
	"Oral Surgery": [
		"Tooth extractions (including wisdom teeth)",
		"Surgical extractions for impacted teeth",
		"Dental implant placement",
		"Bone grafting",
		"Sinus lifts",
	],
	"Aesthetic Dentistry": [
		"Teeth whitening",
		"Veneers",
		"Cosmetic bonding",
		"Tooth reshaping",
		"Smile makeovers",
	],
	"Orthodontics": [
		"Braces (traditional metal, ceramic, lingual)",
		"Clear aligners (e.g., Invisalign)",
		"Retainers and maintenance",
		"Treatment for bite alignment (malocclusion)",
	],
	"Pediatrics": [
		"Dental care for children(infants to adolescents)",
		"Early orthodontic evaluations",
		"Fluoride treatments and sealants for children",
		"Cavity prevention education",
		"Dental care for special needs children",
	],
	"Endodontic Treatment": [
		"Root canal therapy",
		"Treatment for infected or abscessed teeth",
		"Apicoectomy (endodontic surgery)",
		"Retreatment of previous root canals",
	],
	"Prosthodontics": [
		"Crowns and bridges",
		"Dentures (full and partial)",
		"Dental implants and implant-supported dentures",
		"Inlays and onlays",
		"Full mouth rehabilitation",
	],
	"Periodontics": [
		"Gum disease treatment (scaling and root planing)",
		"Gum grafting",
		"Crown lengthening",
		"Dental implant maintenance",
		"Soft tissue management",
	],
	"Other Services": [
		"Emergency dental care",
		"TMJ/TMD treatment",
		"Sedation dentistry (oral or IV sedation)",
		"Snoring and sleep apnea treatment",
		"Custom mouthguards for sports",
	],
};
