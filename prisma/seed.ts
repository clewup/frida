import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({ data: [
  {
    "id": 1,
    "name": "Sofas",
    "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 2,
    "name": "Beds",
    "image": "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 3,
    "name": "Tables",
    "image": "https://images.unsplash.com/photo-1616486886892-ff366aa67ba4?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 4,
    "name": "Chairs",
    "image": "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?q=80&w=3078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 5,
    "name": "Storage",
    "image": "https://images.unsplash.com/photo-1543248939-4296e1fea89b?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 6,
    "name": "Accessories",
    "image": "https://images.unsplash.com/photo-1629949009710-2df14c41a72e?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
] });
  await prisma.subcategory.createMany({ data: [
  {
    "id": 1,
    "name": "Sofa beds",
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Corner sofas",
    "categoryId": 1
  },
  {
    "id": 3,
    "name": "3-seater sofas",
    "categoryId": 1
  },
  {
    "id": 4,
    "name": "2-seater sofas",
    "categoryId": 1
  },
  {
    "id": 5,
    "name": "Bed frames",
    "categoryId": 2
  },
  {
    "id": 6,
    "name": "Mattresses",
    "categoryId": 2
  },
  {
    "id": 7,
    "name": "Headboards",
    "categoryId": 2
  },
  {
    "id": 8,
    "name": "Dining tables",
    "categoryId": 3
  },
  {
    "id": 9,
    "name": "Bar tables",
    "categoryId": 3
  },
  {
    "id": 10,
    "name": "Coffee tables",
    "categoryId": 3
  },
  {
    "id": 11,
    "name": "Desks",
    "categoryId": 3
  },
  {
    "id": 12,
    "name": "Bedside tables",
    "categoryId": 3
  },
  {
    "id": 13,
    "name": "Dining room chairs",
    "categoryId": 4
  },
  {
    "id": 14,
    "name": "Armchairs",
    "categoryId": 4
  },
  {
    "id": 15,
    "name": "Office chairs",
    "categoryId": 4
  },
  {
    "id": 16,
    "name": "Drawers",
    "categoryId": 5
  },
  {
    "id": 17,
    "name": "Shelving",
    "categoryId": 5
  },
  {
    "id": 18,
    "name": "TV stands",
    "categoryId": 5
  },
  {
    "id": 19,
    "name": "Cabinets",
    "categoryId": 5
  },
  {
    "id": 20,
    "name": "Lamps",
    "categoryId": 6
  },
  {
    "id": 21,
    "name": "Rugs",
    "categoryId": 6
  },
  {
    "id": 22,
    "name": "Decor",
    "categoryId": 6
  }
] });
  await prisma.product.createMany({ data: [
  {
    "id": 2,
    "name": "Calvin sofa bed",
    "description": "The gorgeous Calvin sofa bed brings softness to your interior with its beautiful round design and fluffy buccle fabric. Thanks to the sofa bed's easy-to-use mechanism, the sofa converts into a bed quickly and effortlessly. Inside the sofa bed, you will also find a spacious bed linen drawer that provides additional storage space. The sofa bed also comes with two beautiful ball pillows that complement the sofa's soft appearance.",
    "image": "https://isku.fi/cdn/shop/files/Calvin-vuodesohva-Mooda-69296455.jpg?v=1706183093&width=823",
    "price": "1200",
    "stock": 10,
    "colour": "White",
    "categoryId": 1,
    "subcategoryId": 1
  },
  {
    "id": 1,
    "name": "Atlantic sofa bed",
    "description": "The Chic 2-seater sofa bed is a youthful and space-saving sofa bed, whose appearance combines Scandinavian style and lightness. Chic stands out thanks to its details. Beautiful slats finish the appearance and give the sofa stylish frames. The Chic 2-seater sofa bed has an easy-to-use and high-quality Nest bed mechanism.",
    "image": "https://isku.fi/cdn/shop/files/Chic-2h-vuodesohva_-Atlantic-kangas-pohjanmaan-1691074861243.jpg?v=1743505164&width=1346",
    "price": "1900",
    "stock": 50,
    "colour": "Gray",
    "categoryId": 1,
    "subcategoryId": 1
  },
  {
    "id": 3,
    "name": "Joy corner sofa",
    "description": "Joy open corner sofa is a luxuriously soft and comfortable open corner sofa from Pohjanmaan Kaluset, where you can relax with the whole family. The sofa's round design language fits well with current trends. The plush cushions invite you to sit and relax on the sofa. Seating comfort is guaranteed with a soft, yet highly resilient foam filling that retains its shape well.",
    "image": "https://isku.fi/cdn/shop/files/Joy-3h-avokulmasohva-304x237-cm_-leveat-kasinojat-pohjanmaan-77286896.jpg?v=1714727487&width=1346",
    "price": "3500",
    "stock": 10,
    "colour": "Orange",
    "categoryId": 1,
    "subcategoryId": 2
  },
  {
    "id": 4,
    "name": "Como corner sofa",
    "description": "The Como sofa is Finnish design and manufacturing at its best. The stylish and relaxed sofa from HT Collection represents a simple and modern design. The trendy metal tube legs bring airiness to the sofa. Thanks to the ample ground clearance, it is also easy to clean under the sofa. The Como sofa invites you to sit as well as lie down.",
    "image": "https://isku.fi/cdn/shop/files/Como-avokulmadivaani-294x202-cm-ht-collection-70651812.png?v=1708416324&width=1346",
    "price": "2800",
    "stock": 10,
    "colour": "Gray",
    "categoryId": 1,
    "subcategoryId": 2
  },
  {
    "id": 5,
    "name": "Como sofa",
    "description": "The Como sofa is Finnish design and manufacturing at its best. The stylish and relaxed sofa from HT Collection represents a simple and modern design. The trendy metal tube legs bring airiness to the sofa. Thanks to the ample ground clearance, it is also easy to clean under the sofa. The Como sofa invites you to sit as well as lie down.",
    "image": "https://isku.fi/cdn/shop/files/Como-sohva-243-cm-ht-collection-70653879.png?v=1708417497&width=1346",
    "price": "3000",
    "stock": 10,
    "colour": "Black",
    "categoryId": 1,
    "subcategoryId": 3
  },
  {
    "id": 6,
    "name": "Viva sofa",
    "description": "This sofa is upholstered in Leaf fabric, which comes in two gorgeous earthy tones. The legs are black metal legs, which are also available in aluminum. The Viva sofa series has a diverse selection of sofa and divan modules in different sizes, from which you can build a suitable ensemble for yourself, from a single divan to a larger corner sofa. You can choose to finish the appearance of the sofa with either edgy edges or regular seams.",
    "image": "https://isku.fi/cdn/shop/files/Viva-sohva-L218-Leaf-kangas-interface-70357371.jpg?v=1707808725&width=1346",
    "price": "2000",
    "stock": 10,
    "colour": "Gray",
    "categoryId": 1,
    "subcategoryId": 3
  },
  {
    "id": 7,
    "name": "Babe leather sofa",
    "description": "The domestically produced Babe sofa and armchair, made in Lahti, has received its soft design from moss-covered rocks and pebbles shaped by nature. The special feature of the sofa's design language is that each piece is upholstered all around, allowing the parts to be removed and combined freely and conveniently rearranged. Babe is an easy modular sofa, where several different ensembles can be built with just a few pieces.",
    "image": "https://isku.fi/cdn/shop/files/Babe-nahkasohva-L234-leveilla-kasinojilla_-Ranch-nahka-isku-79872399.jpg?v=1715689847&width=1346",
    "price": "4399",
    "stock": 2,
    "colour": "Brown",
    "categoryId": 1,
    "subcategoryId": 4
  },
  {
    "id": 8,
    "name": "Fani sofa",
    "description": "Fani is the perfect solution for apartments where space is limited. Its slim dimensions and narrow frame depth make it an ideal choice for smaller spaces where you still want to enjoy uncompromising seating comfort. In addition, the high ground clearance not only brings visual lightness but also ease of cleaning.",
    "image": "https://isku.fi/cdn/shop/files/stark-513-fani-2_5h-metallijalat.jpg?v=1725966959&width=1346",
    "price": "1900",
    "stock": 0,
    "colour": "White",
    "categoryId": 1,
    "subcategoryId": 4
  },
  {
    "id": 9,
    "name": "Notte bed frame",
    "description": "The design of the Notte bed frame from Kiteen Furniture Factory combines lightness, elegance and timelessness. Notte bed frames can be connected to each other seamlessly. The bed frame includes a slatted base.",
    "image": "https://isku.fi/cdn/shop/files/Notte-runkosanky-kiteen-1695127052743_a2ac7e17-6134-4184-99b6-a3c5fad4715b.jpg?v=1715189255&width=1346",
    "price": "268",
    "stock": 10,
    "colour": "NA",
    "categoryId": 2,
    "subcategoryId": 5
  },
  {
    "id": 10,
    "name": "Ease bed frame",
    "description": "Are you looking for an affordable bed that is easy to move and offers the comfort that Tempur is known for? Tempur Ease is designed for this very need - a compact and high-quality bed solution that combines practicality with Tempur's adaptive technology, making it perfect for a guest room, a cottage or even a young family member.",
    "image": "https://isku.fi/cdn/shop/files/tempur_ease_patja_sangynpaadylla_tyynyt.png?v=1743183033&width=1346",
    "price": "459",
    "stock": 50,
    "colour": "Black",
    "categoryId": 2,
    "subcategoryId": 5
  },
  {
    "id": 11,
    "name": "Ilo spring mattress",
    "description": "Ilo spring mattresses have a 5-zone pocket spring system. The Ilo spring mattress is very body-conforming and is more suitable for sleepers of different shapes and weights. The mattress is upholstered with white mattress fabric.",
    "image": "https://isku.fi/cdn/shop/files/Ilo-joustinpatja-80…la-unigold-1686587587.jpg?v=1686587589&width=1346",
    "price": "288",
    "stock": 100,
    "colour": "NA",
    "categoryId": 2,
    "subcategoryId": 6
  },
  {
    "id": 12,
    "name": "Loiste spring mattress",
    "description": "The Loiste 19 cm thick spring mattress is a high-quality, domestic mattress with a firm pocket spring at an affordable price. The mattresses are upholstered in a stylish grey interior fabric.",
    "image": "\thttps://isku.fi/cdn/shop/files/Loiste-joustinpatja-Isku-Stage-62314295.jpg?v=1701448924&width=823",
    "price": "300",
    "stock": 20,
    "colour": "NA",
    "categoryId": 2,
    "subcategoryId": 6
  },
  {
    "id": 13,
    "name": "Pro Plus SmartCool mattress",
    "description": "The 25 cm thick TEMPUR PRO®️ Plus is the most popular in the range. TEMPUR PRO®️ Plus contains more TEMPUR® material, which allows for even better ergonomic support.",
    "image": "https://isku.fi/cdn/shop/files/Pro-Plus-SmartCool-…4747-aabf-d4af25a308fb.jpg?v=1694516593&width=823",
    "price": "330",
    "stock": 30,
    "colour": "NA",
    "categoryId": 2,
    "subcategoryId": 6
  },
  {
    "id": 14,
    "name": "Loiste headboard",
    "description": "The stunning headboard is upholstered in a light grey interior fabric and has a gorgeous button pattern, width 160 cm and height 125 cm. The headboard is installed on the floor against the wall.",
    "image": "https://isku.fi/cdn/shop/files/Loiste-sangynpaaty-…m-Isku-Stage-62312866.jpg?v=1701447570&width=1346",
    "price": "260",
    "stock": 20,
    "colour": "Gray",
    "categoryId": 2,
    "subcategoryId": 7
  },
  {
    "id": 15,
    "name": "Rosa headboard",
    "description": "Beautiful natural-colored Rosa headboard made of genuine rattan.",
    "image": "\thttps://isku.fi/cdn/shop/files/Rosa-sangynpaaty-16…cm-Isku-Stage-76897937.jpg?v=1714394630&width=823",
    "price": "260",
    "stock": 10,
    "colour": "NA",
    "categoryId": 2,
    "subcategoryId": 7
  },
  {
    "id": 16,
    "name": "Aino dining table",
    "description": "The extendable Aino dining table invites family and friends to enjoy moments together, whether it's for dining or casual entertaining. The durable and timeless design makes this table the perfect choice for the heart of the home. The handcrafted table is made to last and will serve from baby to grandpa.",
    "image": "https://isku.fi/cdn/shop/files/Aino-jatkettava-poyta-110x110_45-cm-pohjanmaan-1686584683.jpg?v=1743342267&width=1346",
    "price": "970",
    "stock": 5,
    "colour": "NA",
    "categoryId": 3,
    "subcategoryId": 8
  },
  {
    "id": 17,
    "name": "Lundegård extendable dining table",
    "description": "Lundegård is a clean-lined and stylish dining table with a graceful and airy design. The extension piece allows for larger groups to dine at the table. There is storage space for the extension piece at the bottom of the table, so it can be hidden away when not in use.",
    "image": "https://isku.fi/cdn/shop/files/240-cm-Mooda-81165453.jpg?v=1734338179&width=1346",
    "price": "390",
    "stock": 10,
    "colour": "NA",
    "categoryId": 3,
    "subcategoryId": 8
  },
  {
    "id": 18,
    "name": "Block dining table",
    "description": "Block is a beautiful and impressive dining table with a stunning herringbone pattern on the top. This stylish table is a real eye-catcher in the dining area. The Block dining table's white oak lacquered top is made of furniture board and oak veneer. The table legs are made of black painted metal. ",
    "image": "https://isku.fi/cdn/shop/files/Block-ruokapoyta-95x220-cm-Mooda-81168311.jpg?v=1716969054&width=1346",
    "price": "878",
    "stock": 10,
    "colour": "NA",
    "categoryId": 3,
    "subcategoryId": 8
  },
  {
    "id": 21,
    "name": "Alessio dining chair",
    "description": "Alessio is a stylish and comfortable dining chair with a rotating (360˚) seat. The rotating seat makes it easy to get up from the dining table. The Alessio chair is versatile and is perfect for the dining room as well as the office. The dining chair is upholstered in a beautiful gray buccle fabric (100% polyester). The seat of the chair is made of plywood and the legs are made of black painted metal. ",
    "image": "https://isku.fi/cdn/shop/files/Alessio-tuoli-pyoriva-Mooda-81173257.jpg?v=1716976701&width=1346",
    "price": "135",
    "stock": 0,
    "colour": "Gray",
    "categoryId": 4,
    "subcategoryId": 13
  },
  {
    "id": 20,
    "name": "Molly dining chair",
    "description": "Molly is a plush dining chair that can be easily combined with many dining tables. The chair's  curved backrest elegantly curves to the sides, providing comfortable support for the back. The Molly chair has metal 4-point legs and an upholstered and padded seat.",
    "image": "https://isku.fi/cdn/shop/files/Molly-tuoli-Isku-Stage-1691647197194.jpg?v=1704273185&width=1346",
    "price": "119",
    "stock": 20,
    "colour": "Gray",
    "categoryId": 4,
    "subcategoryId": 13
  },
  {
    "id": 22,
    "name": "Alison leather dining chair",
    "description": "Rowico Home Alison chair with swivel mechanism. The chair seat is covered in black leather and the legs are made of brown lacquered oak. The padded cup-shaped seat rotates 360 degrees thanks to the mechanism. The chair is part of the Alison collection and is also available in other colors.",
    "image": "https://isku.fi/cdn/shop/files/118132_b_sb_a_Alison_swivelchair_black_leather_brown_oak.jpg?v=1747737109&width=1346",
    "price": "130",
    "stock": 10,
    "colour": "Black",
    "categoryId": 4,
    "subcategoryId": 13
  },
  {
    "id": 23,
    "name": "Babe leather armchair",
    "description": "The domestically produced Babe sofa and armchair, made in Lahti, has received its soft design from moss-covered rocks and pebbles shaped by nature. The special feature of the sofa's design language is that each piece is upholstered all around, allowing the parts to be removed and combined freely and conveniently rearranged. Babe is an easy modular sofa, where several different ensembles can be built with just a few pieces.",
    "image": "https://isku.fi/cdn/shop/files/Babe-nahkanojatuoli-L144-leveilla-kasinojilla_-Ranch-nahka-isku-79872991.jpg?v=1715690530&width=1346",
    "price": "2500",
    "stock": 10,
    "colour": "Brown",
    "categoryId": 4,
    "subcategoryId": 14
  },
  {
    "id": 25,
    "name": "Lumo armchair",
    "description": "The Lumo armchair from Pohjanmaa Furniture offers its occupant wonderful everyday luxury. The Lumo chair's sturdy seating position, firm cushions and high backrest ensure pleasant seating comfort. The refined and sleek look is complemented by high oak legs, which make it easy to clean under the chair.",
    "image": "https://isku.fi/cdn/shop/files/Lumo-nojatuoli_-Elegant-kangas-pohjanmaan-61412894.png?v=1700468997&width=1346",
    "price": "1100",
    "stock": 50,
    "colour": "Yellow",
    "categoryId": 4,
    "subcategoryId": 14
  },
  {
    "id": 24,
    "name": "Verona armchair",
    "description": "The Pohjanmaan Verona mechanism chair is a high-quality and long-lasting piece of furniture for all lovers of comfort. The upright, luxurious and high-backed Verona chair has a graceful and elegant design.",
    "image": "https://isku.fi/cdn/shop/files/Verona-mekanismituoli-oletuskuva.jpg?v=1743507446&width=1346",
    "price": "1400",
    "stock": 20,
    "colour": "Gray",
    "categoryId": 4,
    "subcategoryId": 14
  },
  {
    "id": 26,
    "name": "Copenhagen rattan lounge chair",
    "description": "Copenhagen is a beautiful armchair made of genuine rattan. This stylish chair, in line with current trends, is suitable for both indoors and on a covered terrace. With the Isabella armchair, which offers a timeless design, you can relax comfortably thanks to the thick cushions that come with it. The light cushions bring freshness to the natural-colored rattan. The chair is also light and easy to move. Genuine rattan is a renewable natural material and therefore also an ecological choice. The armchair pairs particularly well with the Isabella sofa or other rattan furniture from the same series. You can add interest and contrast to your interior by combining different surfaces and materials.",
    "image": "https://isku.fi/cdn/shop/files/Isabella-rottinkinojatuoli-Isku-Stage-1689132113799.jpg?v=1689132115&width=1346",
    "price": "404",
    "stock": 20,
    "colour": "NA",
    "categoryId": 4,
    "subcategoryId": 14
  },
  {
    "id": 28,
    "name": "Powder cabinet",
    "description": "Stylish and beautifully designed Puuteri cabinet in a gorgeous greige shade. The spacious cabinet has two fixed shelves and the doors have a soft-close mechanism.",
    "image": "https://isku.fi/cdn/shop/files/Puuteri_kaappi_2.jpg?v=1719405953&width=1346",
    "price": "388",
    "stock": 40,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 16
  },
  {
    "id": 29,
    "name": "Yumi sideboard",
    "description": "Rowico's Yumi sideboard is a timeless oak sideboard that offers plenty of storage space. The shelves behind the closed doors and small drawers keep your household items or dishes neatly hidden. The soft close mechanism of the doors and drawers closes the door softly, providing comfort and preventing dents. The frame is also made of solid oak and the top is made of furniture board.",
    "image": "https://isku.fi/cdn/shop/files/Yumi-senkki-152-x-84-cm-Rowico-1686592315.jpg?v=1686592317&width=1346",
    "price": "1129",
    "stock": 10,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 16
  },
  {
    "id": 30,
    "name": "Dumont sideboard",
    "description": "The Dumont sideboard is a stylish and impressive piece of storage furniture. The sideboard has three spacious cabinets, each with a shelf. The sideboard has a laminated furniture board frame, ABS edge banding and black metal legs. The cabinet doors have oak-colored fronts and a beautiful decorative pattern on the right-hand door. The doors have a push-to-open mechanism.",
    "image": "https://isku.fi/cdn/shop/files/Dumont-senkki-Isku-Stage-79529167.jpg?v=1715151576&width=1346",
    "price": "407",
    "stock": 30,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 16
  },
  {
    "id": 31,
    "name": "Dakota shelf",
    "description": "The Dakota shelf is a graceful and stylish shelf that is suitable for many different interiors and uses. The shelf has sleek black metal legs and coated MDF tops. In addition to the shelf, the Dakota product family also includes a TV stand.",
    "image": "https://isku.fi/cdn/shop/files/Dakota-hylly-Isku-Stage-1689122772713.jpg?v=1689122774&width=1346",
    "price": "172",
    "stock": 30,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 17
  },
  {
    "id": 27,
    "name": "Powder sideboard",
    "description": "Stylish and beautifully designed Puuteri sideboard in a gorgeous greige shade. The spacious sideboard has three cabinets with fixed shelves and the doors have a soft-close mechanism.",
    "image": "https://i.ibb.co/cKpC71xR/Puuteri-Senkki-2-Photoroom.png",
    "price": "407",
    "stock": 20,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 16
  },
  {
    "id": 32,
    "name": "Holton bookcase",
    "description": "The Holton bookcase is a lightweight, yet high-quality shelf for the living room, office or bedroom. The beautiful Scandinavian-inspired shelf offers plenty of storage space for important household items and books. The bookcase has 10 spacious shelves and its uprights are made of oak and the shelves are made of oak veneer. The design of the Holton bookcase plays with wooden slats and shelves and the space between them in a modern way.",
    "image": "https://isku.fi/cdn/shop/files/rowico-holton-kirjahylly-tammi-viisto.jpg?v=1732276794&width=1346",
    "price": "1429",
    "stock": 2,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 17
  },
  {
    "id": 33,
    "name": "Notte TV stand",
    "description": "The Notte TV stand is a modern and airy stand with versatile storage options. The beautifully designed TV stand's two drawers are perfect for hiding things like remote controls and magazines.",
    "image": "https://isku.fi/cdn/shop/files/notte-tv-taso-valkoinen-1.jpg?v=1720543848&width=1346",
    "price": "739",
    "stock": 0,
    "colour": "White",
    "categoryId": 5,
    "subcategoryId": 18
  },
  {
    "id": 34,
    "name": "Powder TV stand",
    "description": "Stylish and beautifully designed Puuteri TV stand in a gorgeous greige shade. The TV stand has three cabinets and the doors have a soft-close mechanism.",
    "image": "https://isku.fi/cdn/shop/files/Puuteri_tv_taso_2.jpg?v=1719472742&width=1346",
    "price": "316",
    "stock": 20,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 18
  },
  {
    "id": 35,
    "name": "Brooklyn TV stand",
    "description": "The Scandinavian Brooklyn TV stand is a timeless oak table with a design that also offers storage space. The shelves behind the closed doors keep your household items neatly hidden. The small middle drawer is perfect for storing, for example, the remote control. The soft close mechanism of the doors and drawer closes the door softly, while providing comfort and preventing bumps. The back wall of the open shelf has an opening through which you can thread the cables of electronic devices into the socket.",
    "image": "https://isku.fi/cdn/shop/files/Brooklyn-TV-Taso-160-cm-rowico-1686591168.jpg?v=1686591175&width=1346",
    "price": "1049",
    "stock": 30,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 18
  },
  {
    "id": 36,
    "name": "Orion TV stand",
    "description": "The Orion stand is a stylish TV stand with two drawers and a door, behind which there is a shelf and cable holes. The doors and drawers have a handle-free push-open mechanism. The graceful metal legs give the stand airiness and make cleaning easier.",
    "image": "https://isku.fi/cdn/shop/files/Orion-taso-161-cm_-2-ovea-ja-2-laatikkoa-Isku-Stage-1686584656.jpg?v=1705998865&width=1346",
    "price": "776",
    "stock": 20,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 18
  },
  {
    "id": 37,
    "name": "Halifax cabinet",
    "description": "The Halifax cabinet is a stylish and graceful cabinet made of black painted oak. The clean-lined cabinet is suitable for the dining room, living room, hallway and kitchen. The cabinet's beautiful details include vertical grooves in the doors and gold-colored handles. The cabinet doors are equipped with a soft close mechanism, which closes the door softly and at the same time provides comfort and prevents dents. The Halixaf cabinet has two shelves, which provide ample storage space for important household items or dishes, for example. The height of the shelves can be adjusted. The high metal legs give the Halifax cabinet a lightness and make it easier to clean under the cabinet.",
    "image": "https://isku.fi/cdn/shop/files/Halifax-kaappi-rowico-1692703864274.jpg?v=1692703866&width=1346",
    "price": "1529",
    "stock": 30,
    "colour": "Black",
    "categoryId": 5,
    "subcategoryId": 19
  },
  {
    "id": 38,
    "name": "Lexie cabinet",
    "description": "The Lexie cabinet brings quality to your interior and is perfect for many different spaces in your home. The lacquered surface of the cabinet and the rattan braids on the fronts of the doors create a wonderfully individual look for the furniture. Four spacious cabinets provide plenty of storage space. The cabinet doors have slow-closing hinges, which provide ease of use. The cabinet doors have slow-closing hinges, which provide ease of use. ",
    "image": "https://isku.fi/cdn/shop/files/Lexie-kaappi-Mooda-77249237.jpg?v=1714717262&width=1346",
    "price": "763",
    "stock": 30,
    "colour": "NA",
    "categoryId": 5,
    "subcategoryId": 19
  },
  {
    "id": 39,
    "name": "Guide floor lamp",
    "description": "The Guide floor lamp seamlessly combines practicality and elegance. Its clean-lined design and high-quality metal finish make it both an efficient light source and a stylish interior design element. This lamp brings a modern touch to any space, whether it's a reading nook or a living area, while providing reliable lighting for everyday needs.",
    "image": "https://isku.fi/cdn/shop/files/valaisin-gronlund-guide-floor-lamp-green-01.jpg?v=1738675228&width=1346",
    "price": "296",
    "stock": 30,
    "colour": "Green",
    "categoryId": 6,
    "subcategoryId": 20
  },
  {
    "id": 40,
    "name": "Austin floor lamp",
    "description": "The Austin floor lamp offers both elegance and functionality to any space. Its classic design combined with a modern touch creates a timeless look that suits a variety of interiors.",
    "image": "https://isku.fi/cdn/shop/files/valaisin-gronlund-austin-floor-lamp-white-01.jpg?v=1737991106&width=1346",
    "price": "319",
    "stock": 20,
    "colour": "White",
    "categoryId": 6,
    "subcategoryId": 20
  },
  {
    "id": 42,
    "name": "Sävel decorative cushion",
    "description": "The Sävel decorative pillow is a trendy addition to your home decor. The pattern of the decorative pillow beautifully combines different surfaces and gives the pillow a modern look. The Sävel pillow creates a cozy atmosphere in the interior and it goes great with other pillows and blankets in the series. The decorative pillows have a zipper, so the cover can be easily removed for washing.",
    "image": "https://isku.fi/cdn/shop/files/Savel-koristetyyny-50x50-cm-Isku-Stage-1692357177912.jpg?v=1703854076&width=1346",
    "price": "29",
    "stock": 100,
    "colour": "NA",
    "categoryId": 6,
    "subcategoryId": 22
  },
  {
    "id": 43,
    "name": "Tikke placemat",
    "description": "The Tikken placemat is a round, braided table mat that brings a natural look to your table setting and interior design. The same series also includes a jute mat, which is available in several sizes.",
    "image": "https://isku.fi/cdn/shop/files/Tikken-tabletti-halk.-38-cm-Isku-Stage-1686592262.jpg?v=1703176119&width=1346",
    "price": "6",
    "stock": 20,
    "colour": "NA",
    "categoryId": 6,
    "subcategoryId": 22
  },
  {
    "id": 44,
    "name": "Malone mirror",
    "description": "The Malone floor mirror is a stylish and graceful black mirror with beautiful gold-colored metal hanging knobs. The knobs on the side of the mirror can be placed wherever you want. The modern Malone mirror is well suited for hallways as well as other rooms in the home. The mirror is made of powder-coated metal.",
    "image": "https://isku.fi/cdn/shop/files/Malone-Lattiapeili-53x170cm-rowico-1689323198429_603f5adc-a9b1-4b39-877a-7bdb05de6f0c.jpg?v=1738062104&width=1346",
    "price": "289",
    "stock": 20,
    "colour": "NA",
    "categoryId": 6,
    "subcategoryId": 22
  },
  {
    "id": 19,
    "name": "Brooklyn dining table",
    "description": "The Brooklyn dining table is a sturdy solid oak table with a black painted U-shaped metal leg that adds a stylish touch to the whole. It's nice to gather around a beautiful, high-quality table to eat, and setting beautiful table settings is effortless on the beautiful wooden surface.",
    "image": "https://i.ibb.co/m56MVXTD/Brooklyn-Table-95x170-cm.png",
    "price": "1129",
    "stock": 20,
    "colour": "NA",
    "categoryId": 3,
    "subcategoryId": 8
  },
  {
    "id": 41,
    "name": "Rimu decorative pillow",
    "description": "The Riimu decorative pillow will complete your home decor. The pattern of the striking decorative pillow beautifully combines different surfaces and gives the pillow a bohemian look. The Riimu pillow creates a cozy atmosphere in the bedroom and living room and it goes wonderfully with the other pillows in the series. The decorative pillows have a zipper, so the cover can be easily removed for washing.",
    "image": "https://i.ibb.co/mFdHpgrv/Riimu-Cushion-50x50-1.png",
    "price": "23",
    "stock": 100,
    "colour": "NA",
    "categoryId": 6,
    "subcategoryId": 22
  }
] });
}
main().catch(console.error).finally(() => prisma.$disconnect());