import Diastema from '@/assets/images/conditions/condition-1.png'
import Malocclusion from '@/assets/images/conditions/condition-2.png'
import ToothAgenesis from '@/assets/images/conditions/condition-3.png'
import Periodontal from '@/assets/images/conditions/condition-4.png'
import ToothDecay from '@/assets/images/conditions/condition-5.png'
import CrackedToothSyndrome from '@/assets/images/conditions/condition-6.png'

export const conditions = [
    {
        title: 'Diastema',
        description: 'refers to a gap between your teeth. Gaps can occur anywhere in your mouth, but they’re most common between your two front teeth.',
        // This condition is usually a cosmetic concern, but sometimes, it’s related to gum disease. Diastema treatments include dental bonding, porcelain veneers and braces.
        img: Diastema
    },
    {
        title: "Malocclusion ",
        description: `of the teeth is when your teeth are misaligned.
        `,
        /* 
            This can lead to oral health complications if left untreated. 
                - It may also be referred to as:
                - crowded teeth
                - crossbite
                - overbite
                - underbite
                - open bite
            Your teeth may not perform vital functions well, like chewing, if they’re misaligned. Learn more about this condition and how it may be treated to protect your overall oral and digestive health.
         */
        img: Malocclusion
    },
    {
        title: 'Tooth agenesis',
        description: "is a congenital condition wherein a patient's mouth just didn't get directions to make some of their permanent teeth when they were born.",
        // This can range in severity from hypodontia, in which five or fewer teeth are missing, to oligodontia, when six or more permanent teeth are missing in action — this is uncommon, but often associated with genetic syndromes like Down syndrome, Van Der Woude syndrome, Reiger syndrome and ectodermal dysplasia. Anodontia is a rare recessive genetic disorder in which someone just doesn't get permanent teeth — it's also often associated with conditions like ectodermal dysplasia.
        img: ToothAgenesis
    },
    {
        title: "Periodontal (gum) disease",
        description: "is an infection of the tissues that hold your teeth in place.",
        // It's typically caused by poor brushing and flossing habits that allow plaque—a sticky film of bacteria—to build up on the teeth and harden. It starts with swollen, red, and bleeding gums. If left untreated, it can spread to the bones surrounding the gums, making it painful to chew. In the worst cases, teeth may become loose or need to be removed.
        img: Periodontal
    },
    {
        title: "Tooth decay",
        description: `
        occurs when bacteria in the mouth produce acids that attack the enamel, or protective outer layer of the tooth. If left untreated, tooth decay could lead to gum disease, cavities, and possibly tooth loss. 
        `,
        /* 
            Unfortunately, tooth decay is very prevalent in the United States. According to the Centers for Disease Control and Prevention (CDC), more than 1 in 4 adults have untreated tooth decay.1 Knowing the signs and symptoms of tooth decay can lead to treatment to restore healthy teeth and gums. It’s also crucial to learn how to maintain good oral hygiene to ward off tooth decay.
        */
        img: ToothDecay
    },
    {
        title: "Cracked tooth syndrome (CTS)",
        description: `
        is where a tooth has incompletely cracked but no part of the tooth has yet broken off. Sometimes it is described as a greenstick fracture. 
        `,
        /* 
            The symptoms are very variable, making it a notoriously difficult condition to diagnose.

            Cracked tooth syndrome could be considered a type of dental trauma and also one of the possible causes of dental pain. One definition of cracked tooth syndrome is "a fracture plane of unknown depth and direction passing through tooth structure that, if not already involving, may progress to communicate with the pulp and/or periodontal ligament."
        */
        img: CrackedToothSyndrome
    }
]