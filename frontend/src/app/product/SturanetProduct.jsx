import Link from "next/link";
import React from "react";

const SturanetProduct = () => {
    const products = [
        {
            title: "Vote",
            description:
                "Sturan Network memberikan kebebasan bagi komunitas untuk memberikan proposal pendaftaran kampanye baru, sturan network memperkenalkan voting terdesentralisasi sebagai mekanisme inti untuk menentukan arah kampanye baru.",
            imgAlt: "Rollup Image",
            url: "https://lpsturanet.vercel.app/ecosystem/xtr"
        },
        {
            title: "Propose Campaign",
            description:
                "Komunitas juga dapat membuat proposal inisiatif yang diajukan kepada komunitas lain. Ini berarti governance on-chain jika mayoritas komunitas menyetujui agar campaign tersebut didaftarkan, maka tim pengembang akan mengembangkan campaign sesuai dengan proposal.",
            imgAlt: "AnyTrust Image",
            url: "https://lpsturanet.vercel.app/ecosystem/xtr"
        },
        {
            title: "Volunteering",
            description:
                "Komunitas dapat menjadi relawan jika kampanye yang berlangsung. Relawan akan di sortir untuk menghindari penyalahgunaan dana jika sudah terkumpul.",
            imgAlt: "Orbit Image",
            url: "https://lpsturanet.vercel.app/ecosystem/xtr"
        },
        {
            title: "Coming Soon",
            description:
                "Sebagai badan yang fokus pada pengembangan teknologi blockchain, Sturanet Labs akan terus berkomitmen untuk memperbarui dan memperkuat ekosistem sturan. Ini termasuk penambahan fitur, peningkatan keamanan, serta pengelolaan tata kelola.",
            imgAlt: "Stylus Image",
            url: "https://lpsturanet.vercel.app/docs/getting-started"
        },
    ];

    return (
        <section className="bg-black text-white py-10 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col max-w-3xl mx-auto text-start mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Bersama Sturan Network, kita harus berkomitmen untuk menjadi pahlawan di sekitar kita.
                    </h2>
                    <p className="text-lg text-gray-400">
                        Sturan Network dibangun dengan kesadaran kemanusiaan yang besar dan memanusiakan manusia.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <Link
                            href={product.url}
                            target="_blank"
                            key={index}
                            className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <div className="mb-4">
                                <div className="bg-white h-16 w-16 mx-auto rounded-full mb-4"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                            <p className="text-gray-400">{product.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SturanetProduct;
