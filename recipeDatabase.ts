import type { Recipe } from '../types';

// A rich, internal database of over 100 recipe ideas.
const STATIC_RECIPES: Record<string, Recipe[]> = {
    "Mango": [
      { name: "Aam ka Dal", description: "A tangy and flavorful Andhra-style lentil curry made with raw mangoes." },
      { name: "Kacchi Kairi Chutney", description: "A spicy and sour chutney from raw green mangoes, perfect with rice or snacks." },
      { name: "Aam Panna", description: "A refreshing and cooling summer drink made from boiled and sweetened raw mangoes." },
      { name: "Mango Lassi", description: "A creamy and sweet yogurt-based drink, beloved across India." }
    ],
    "Jakfruit": [
      { name: "Kathal ki Sabzi", description: "A savory curry with green jackfruit that has a meaty texture, cooked in a spiced onion-tomato gravy." },
      { name: "Idichakka Thoran", description: "A South Indian stir-fry made with tender jackfruit, coconut, and spices." },
      { name: "Chakka Varatti", description: "A traditional Keralan jackfruit preserve or halwa, made with ripe jackfruit and jaggery." },
      { name: "Jackfruit Biryani", description: "A flavorful and aromatic rice dish where jackfruit mimics meat perfectly." }
    ],
    "Banana": [
      { name: "Vazhakkai Poriyal", description: "A simple South Indian stir-fry made with raw bananas (plantains), spices, and coconut." },
      { name: "Banana Stem Poriyal", description: "A nutritious stir-fry using the fibrous inner stem of the banana plant." },
      { name: "Banana Flower Vadai", description: "Crispy and savory fritters made from banana blossoms, lentils, and spices." },
      { name: "Raw Banana Cutlets", description: "Spiced patties made from boiled and mashed raw bananas, a perfect snack." }
    ],
    "Papaya": [
        { name: "Papaya Kachumber", description: "A refreshing raw papaya salad with tomatoes, cucumbers, and a simple lemon-spice dressing." },
        { name: "Papaya Haldi Chaat", description: "A healthy street-food style snack with raw papaya, turmeric, and tangy spices." },
        { name: "Raw Papaya Kootu", description: "A mild and comforting South Indian lentil and coconut curry with raw papaya." }
    ],
    "Guava": [
        { name: "Amrood ki Sabzi", description: "A unique and tangy curry made with semi-ripe guavas in a spicy tomato gravy." },
        { name: "Guava Raita", description: "A unique and refreshing raita made with grated guava and spiced yogurt." },
        { name: "Fruit Chaat (Guava)", description: "A classic Indian fruit salad where guava is a star ingredient, tossed in chaat masala." }
    ],
    "Lychee": [
        { name: "Lychee Kheer", description: "A creamy and aromatic Indian rice pudding flavored with fresh lychees." },
        { name: "Lychee Kulfi", description: "A rich and dense traditional Indian ice cream infused with the delicate flavor of lychee." },
        { name: "Lychee Fruit Chaat", description: "A delightful fruit salad where juicy lychees are tossed with tangy spices." }
    ],
    "Loquat": [
        { name: "Loquat Chutney", description: "A sweet and tangy preserve made from loquats, perfect with flatbreads or as a side." },
        { name: "Loquat Raita", description: "A cooling yogurt dish with finely chopped loquats and a hint of spice." }
    ],
    "Jujube": [
        { name: "Ber Chutney", description: "A traditional sweet and sour chutney made from Indian jujubes (Ber)." },
        { name: "Ber ka Achaar", description: "A tangy and spicy pickle made from dried or fresh jujubes." }
    ],
    "Amla": [
        { name: "Amla Chutney", description: "A super healthy and tangy chutney made from Indian gooseberries, rich in Vitamin C." },
        { name: "Amla Rice", description: "A flavorful and nutritious rice dish flavored with grated amla and spices." },
        { name: "Amla Murabba", description: "A sweet preserve made by candying whole Indian gooseberries." }
    ],
    "Pomegranate": [
      { name: "Anar Raita", description: "A beautiful and refreshing yogurt dip studded with juicy pomegranate seeds." },
      { name: "Sprouted Moong & Anar Chaat", description: "A healthy and protein-rich salad with sprouted lentils and pomegranate." },
      { name: "Pomegranate Pulao", description: "A festive rice dish bejeweled with bright pomegranate arils." }
    ],
    "Passionfruit": [
      { name: "Passionfruit Shrikhand", description: "A creamy, strained yogurt dessert with the tangy, tropical flavor of passionfruit." },
      { name: "Passionfruit Lassi", description: "A refreshing yogurt-based drink blending sweet and tart passionfruit pulp." }
    ],
    "Citrus": [
      { name: "Lemon Rice", description: "A classic South Indian dish of rice flavored with lemon juice, turmeric, and tempering spices." },
      { name: "Nimbu Rasam", description: "A light and tangy soup made with lemon juice and spices, excellent for digestion." },
      { name: "Pomelo Chaat", description: "A refreshing salad made with pomelo segments, chaat masala, and herbs." },
      { name: "Orange Peel Thokku", description: "A flavorful South Indian pickle made from orange peels." }
    ],
    "Grapes": [
      { name: "Draksha Pachadi", description: "A traditional Kerala-style sweet and sour curry with grapes in a coconut-yogurt base." },
      { name: "Grape Chutney", description: "A simple and delicious chutney that balances the sweetness of grapes with spices." }
    ],
    "Avocado": [
      { name: "Avocado Pachadi (fusion)", description: "A creamy, South Indian-inspired raita made with mashed avocado, yogurt, and tempering spices." },
      { name: "Avocado Paratha (fusion)", description: "A nutritious flatbread with mashed avocado mixed into the dough." }
    ],
    "Date": [
      { name: "Khajoor Ladoo", description: "Healthy and sugar-free sweet balls made from dates and nuts." },
      { name: "Date & Tamarind Chutney", description: "The classic sweet and sour chutney used in chaats, made from dates and tamarind." }
    ],
    "Fig": [
      { name: "Anjeer Barfi", description: "A healthy and delicious Indian sweet made from dried figs and nuts." },
      { name: "Fig & Ginger Chutney", description: "A sweet and savory chutney made with figs and a hint of ginger, perfect with cheese or flatbreads." }
    ],
    "Watermelon": [
      { name: "Tarbooz Chaat", description: "A simple and refreshing watermelon salad with a sprinkle of chaat masala." },
      { name: "Watermelon Rind Sabzi", description: "A unique curry made from the often-discarded watermelon rind, cooked with spices." }
    ],
    "Eggplant": [
      { name: "Baingan Bharta", description: "A smoky and flavorful dish of fire-roasted eggplant mashed with onions, tomatoes, and spices." },
      { name: "Bagara Baingan", description: "A Hyderabadi curry of small eggplants cooked in a rich and nutty gravy." },
      { name: "Bharwa Baingan", description: "Small eggplants stuffed with a spicy mixture of peanuts, coconut, and spices." }
    ],
    "Okra": [
      { name: "Bhindi Masala", description: "A popular Indian stir-fry where okra is cooked with onions, tomatoes, and spices." },
      { name: "Kurkuri Bhindi", description: "Crispy, deep-fried okra coated in spices, a perfect crunchy side dish." },
      { name: "Bhindi Do Pyaza", description: "A flavorful okra curry that uses a 'double' amount of onions in two different stages." }
    ],
    "Ivy Gourd": [
      { name: "Dondakaya Curry", description: "A simple and delicious Andhra-style curry made with ivy gourd." },
      { name: "Tindora Fry with Peanuts", description: "A crispy stir-fry of ivy gourd with a nutty crunch from roasted peanuts." }
    ],
    "Snake Gourd": [
      { name: "Padwal Dal", description: "A comforting lentil curry cooked with snake gourd." },
      { name: "Snake Gourd Kootu", description: "A South Indian style lentil and coconut curry with snake gourd." }
    ],
    "Snake Beans": [
      { name: "Yardlong Bean Poriyal", description: "A South Indian stir-fry with long beans, coconut, and mild spices." },
      { name: "Barbati Aloo Sabzi", description: "A simple North Indian style dry curry made with yardlong beans and potatoes." }
    ],
    "Bottle Gourd": [
      { name: "Lauki Chana Dal", description: "A healthy and wholesome curry with bottle gourd and split chickpeas." },
      { name: "Lauki Raita", description: "A cooling yogurt dip with grated bottle gourd." },
      { name: "Lauki Kofta", description: "Fried dumplings of grated bottle gourd served in a creamy tomato-onion gravy." }
    ],
    "Taro": [
      { name: "Arbi Masala Fry", description: "A flavorful dry curry made with boiled and fried taro root, coated in spices." },
      { name: "Patra (Alu Vadi)", description: "A savory snack made by steaming and frying rolled colocasia leaves smeared with a spiced paste." },
      { name: "Arbi ki Kadhi", description: "A tangy yogurt-based curry with fried taro root chunks." }
    ],
    "Cassava": [
      { name: "Kappa Puzhukku", description: "A Keralan staple of boiled and mashed tapioca, often served with fish curry." },
      { name: "Cassava Chips", description: "Thinly sliced and deep-fried cassava, a popular South Indian snack." }
    ],
    "Lotus": [
      { name: "Kamal Kakdi ki Sabzi", description: "A delicious curry made with lotus root slices in a spiced gravy." },
      { name: "Makhana Kheer", description: "A creamy and healthy pudding made with puffed lotus seeds (fox nuts)." }
    ],
    "Rosella": [
      { name: "Gongura Pachadi", description: "A famous and tangy Andhra chutney made from Rosella (Gongura) leaves." },
      { name: "Gongura Dal", description: "A sour and spicy lentil curry flavored with Gongura leaves." }
    ],
    "Pigeon Pea": [
      { name: "Toor Dal Tadka", description: "A classic Indian lentil dish tempered with aromatic spices." },
      { name: "Sambar", description: "A flavorful South Indian stew of lentils and vegetables, with a tamarind-based broth." },
      { name: "Puran Poli", description: "A sweet flatbread stuffed with a filling of cooked and sweetened pigeon peas." }
    ],
    "Nut": [
      { name: "Badam Kheer", description: "A rich and creamy pudding made from ground almonds, milk, and sugar." },
      { name: "Kaju Katli", description: "A diamond-shaped Indian sweet made from cashews." },
      { name: "Pista Kulfi", description: "A traditional Indian ice cream flavored with pistachios." }
    ],
    "Curry Leaf": [
      { name: "Karuveppilai Podi", description: "A flavorful and aromatic spice powder made from roasted curry leaves and lentils." },
      { name: "Curry Leaf Rice", description: "A fragrant rice dish flavored with a paste of fresh curry leaves and spices." }
    ],
    "Aromatic": [
      { name: "Adraki Aloo Gobi", description: "A classic cauliflower and potato stir-fry with a dominant, warming flavor of ginger." },
      { name: "Haldi Doodh (Golden Milk)", description: "A healthy and anti-inflammatory drink made with milk and turmeric." },
      { name: "Mango Ginger Pickle", description: "A unique pickle made from mango ginger, which tastes like ginger but smells like raw mango." }
    ],
    "Cardamom": [
      { name: "Elaichi Phirni", description: "A creamy ground rice pudding delicately flavored with cardamom." },
      { name: "Masala Chai", description: "Traditional Indian spiced tea where cardamom is a key aromatic ingredient." }
    ],
    "Cinnamon": [
      { name: "Dalchini Pulao", description: "An aromatic rice dish where Basmati rice is flavored with cinnamon sticks and other whole spices." },
      { name: "Cinnamon Spiced Kheer", description: "A warm and comforting rice pudding with a prominent cinnamon flavor." }
    ],
    "Pepper": [
      { name: "Milagu Rasam", description: "A spicy and therapeutic South Indian soup made with black pepper and tamarind." },
      { name: "Pepper Chicken (fusion)", description: "A fiery dry chicken preparation heavily flavored with coarse ground black pepper." }
    ],
    "Lemongrass": [
      { name: "Lemongrass Chai", description: "A refreshing and aromatic twist on traditional Indian tea." },
      { name: "Lemongrass Rasam", description: "A fragrant and tangy South Indian soup infused with lemongrass." }
    ],
    "Gotu Kola": [
      { name: "Gotu Kola Sambol", description: "A refreshing and healthy Sri Lankan style 'salad' with chopped Gotu Kola, coconut, and lime." },
      { name: "Brahmi Tambuli", description: "A cooling and medicinal yogurt-based dish from Karnataka, made with Brahmi leaves." }
    ],
    "Betel Piper": [
      { name: "Meetha Paan", description: "A traditional Indian mouth freshener and digestive, a sweet treat wrapped in a betel leaf." },
      { name: "Paan Ladoo", description: "Sweet coconut balls infused with the unique flavor of betel leaves." }
    ],
    "Bay Tree": [
      { name: "Bay Leaf Pulao", description: "A simple yet aromatic rice dish where Basmati rice is flavored with bay leaves and whole spices." },
      { name: "Tej Patta Masoor Dal", description: "A flavorful red lentil curry infused with the aroma of Indian bay leaves." }
    ],
    "Warrigal Greens": [
        { name: "Warrigal Greens Saag", description: "A fusion dish where native Warrigal Greens are cooked in the style of a traditional Indian spinach curry." },
        { name: "Warrigal Palak 'Paneer' (tofu)", description: "A vegan twist on a classic, using Warrigal Greens instead of spinach and tofu instead of paneer." }
    ],
     "Davidson's Plum": [
        { name: "Davidson’s Plum Chutney", description: "A sharp and tangy chutney, perfect for using this native Australian fruit in an Indian style." },
        { name: "Davidson’s Plum Rasam", description: "A fusion South Indian soup using the sour Davidson's Plum as the tangy base." }
    ],
    "Lilly Pilly": [
        { name: "Lilly Pilly Mint Raita", description: "A refreshing yogurt dip combining the tartness of Lilly Pilly with fresh mint." },
        { name: "Lilly Pilly & Ginger Chutney", description: "A sweet and spicy chutney that pairs well with savory snacks." }
    ],
};

export function findRecipesInDatabase(plantName: string): Recipe[] | null {
    const normalizedPlantName = plantName.toLowerCase();
    
    // Direct match check first
    for (const key in STATIC_RECIPES) {
        if (key.toLowerCase() === normalizedPlantName) {
            return STATIC_RECIPES[key];
        }
    }
    
    // Check for common keywords
    if (normalizedPlantName.includes('mango')) return STATIC_RECIPES['Mango'];
    if (normalizedPlantName.includes('jackfruit') || normalizedPlantName.includes('jakfruit')) return STATIC_RECIPES['Jakfruit'];
    if (normalizedPlantName.includes('banana') || normalizedPlantName.includes('plantain')) return STATIC_RECIPES['Banana'];
    if (normalizedPlantName.includes('papaya')) return STATIC_RECIPES['Papaya'];
    if (normalizedPlantName.includes('guava')) return STATIC_RECIPES['Guava'];
    if (normalizedPlantName.includes('lychee')) return STATIC_RECIPES['Lychee'];
    if (normalizedPlantName.includes('loquat')) return STATIC_RECIPES['Loquat'];
    if (normalizedPlantName.includes('jujube')) return STATIC_RECIPES['Jujube'];
    if (normalizedPlantName.includes('amla')) return STATIC_RECIPES['Amla'];
    if (normalizedPlantName.includes('carambola') || normalizedPlantName.includes('star fruit')) return STATIC_RECIPES['Carambola'];
    if (normalizedPlantName.includes('pomegranate')) return STATIC_RECIPES['Pomegranate'];
    if (normalizedPlantName.includes('passionfruit')) return STATIC_RECIPES['Passionfruit'];
    if (normalizedPlantName.includes('grape')) return STATIC_RECIPES['Grapes'];
    if (normalizedPlantName.includes('avocado')) return STATIC_RECIPES['Avocado'];
    if (normalizedPlantName.includes('date')) return STATIC_RECIPES['Date'];
    if (normalizedPlantName.includes('fig')) return STATIC_RECIPES['Fig'];
    if (normalizedPlantName.includes('watermelon')) return STATIC_RECIPES['Watermelon'];
    if (normalizedPlantName.includes('eggplant') || normalizedPlantName.includes('brinjal')) return STATIC_RECIPES['Eggplant'];
    if (normalizedPlantName.includes('okra')) return STATIC_RECIPES['Okra'];
    if (normalizedPlantName.includes('ivy gourd') || normalizedPlantName.includes('tindora')) return STATIC_RECIPES['Ivy Gourd'];
    if (normalizedPlantName.includes('snake gourd')) return STATIC_RECIPES['Snake Gourd'];
    if (normalizedPlantName.includes('snake beans')) return STATIC_RECIPES['Snake Beans'];
    if (normalizedPlantName.includes('bottle gourd') || normalizedPlantName.includes('lauki')) return STATIC_RECIPES['Bottle Gourd'];
    if (normalizedPlantName.includes('wax gourd')) return STATIC_RECIPES['Wax Gourd'];
    if (normalizedPlantName.includes('pumpkin')) return STATIC_RECIPES['Pumpkin'];
    if (normalizedPlantName.includes('taro') || normalizedPlantName.includes('arbi')) return STATIC_RECIPES['Taro'];
    if (normalizedPlantName.includes('cassava') || normalizedPlantName.includes('kappa')) return STATIC_RECIPES['Cassava'];
    if (normalizedPlantName.includes('lotus')) return STATIC_RECIPES['Lotus'];
    if (normalizedPlantName.includes('rosella') || normalizedPlantName.includes('gongura')) return STATIC_RECIPES['Rosella'];
    if (normalizedPlantName.includes('pigeon pea')) return STATIC_RECIPES['Pigeon Pea'];
    if (normalizedPlantName.includes('curry leaf')) return STATIC_RECIPES['Curry Leaf'];
    if (normalizedPlantName.includes('ginger') || normalizedPlantName.includes('turmeric') || normalizedPlantName.includes('galangal')) return STATIC_RECIPES['Aromatic'];
    if (normalizedPlantName.includes('cardamom')) return STATIC_RECIPES['Cardamom'];
    if (normalizedPlantName.includes('cinnamon')) return STATIC_RECIPES['Cinnamon'];
    if (normalizedPlantName.includes('pepper')) return STATIC_RECIPES['Pepper'];
    if (normalizedPlantName.includes('lemongrass')) return STATIC_RECIPES['Lemongrass'];
    if (normalizedPlantName.includes('gotu kola') || normalizedPlantName.includes('brahmi')) return STATIC_RECIPES['Gotu Kola'];
    if (normalizedPlantName.includes('betel')) return STATIC_RECIPES['Betel Piper'];
    if (normalizedPlantName.includes('bay tree') || normalizedPlantName.includes('bay leaf')) return STATIC_RECIPES['Bay Tree'];
    if (normalizedPlantName.includes('warrigal')) return STATIC_RECIPES['Warrigal Greens'];
    if (normalizedPlantName.includes('davidson')) return STATIC_RECIPES["Davidson's Plum"];
    if (normalizedPlantName.includes('lilly pilly')) return STATIC_RECIPES["Lilly Pilly"];
    if (normalizedPlantName.includes('almond') || normalizedPlantName.includes('walnut') || normalizedPlantName.includes('hazelnut') || normalizedPlantName.includes('pecan') || normalizedPlantName.includes('macadamia')) return STATIC_RECIPES['Nut'];
    if (normalizedPlantName.includes('lemon') || normalizedPlantName.includes('lime') || normalizedPlantName.includes('orange') || normalizedPlantName.includes('mandarin') || normalizedPlantName.includes('pomelo') || normalizedPlantName.includes('kumquat')) return STATIC_RECIPES['Citrus'];


    return null;
}