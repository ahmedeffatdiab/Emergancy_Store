import React from 'react'

const About = () => {
  return (
    <div>
      <div className="container">
        <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h4 className="">About Us</h4>
        <p className="lead text-muted">
          Discover high-quality fashion for every lifestyle — from casual tees to performance sportswear.
        </p>
      </div>

      {/* Intro Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6  ">
          <img src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749600983/blog-4_i3l2m9.jpg" className="img-fluid rounded w-75 m-auto"  alt="About Fashion" />
        </div>
        <div className="col-md-6">
          <h3>Who We Are</h3>
          <p>
            We're a team of fashion enthusiasts offering premium clothing for modern lifestyles. Whether you're hitting the gym, heading to work, or dressing up for the weekend, our collection combines comfort, quality, and style. We believe that clothing isn't just a piece of clothing; it's an extension of your personality and an expression of your personal style. That's why we carefully design our products, using carefully selected materials, to ensure a comfortable, long-lasting wearing experience. Our goal is for every customer to feel confident and unique every moment they wear one of our products.
          </p>
        </div>
      </div>

      {/* Product Categories Grid */}
      <h3 className="mb-4">Our Collections</h3>
      <div className="row g-4">
        {[
          { title: "T-Shirts", image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601111/shirt-3_h9vnlo.jpg" },
          { title: "Jackets", image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601092/jacket-7_ezd4dy.jpg" },
          { title: "Shoes", image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601133/sports-6_cygtzy.jpg" },
          { title: "Sportswear", image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601126/shorts-1_xhtpxz.jpg" },
          { title: "Accessories", image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601095/il_794xN.5516071211_lbgb_ad7dwv.jpg" },
          { title: "Skirts", image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601014/clothes-4_fmlqbf.jpg" },

        ].map((item, idx) => (
          <div key={idx} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <img height="220px" src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="mt-5 text-center">
        <h3>Our Mission</h3>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          We believe fashion should be accessible, durable, and ethical. Our mission is to offer
          customers stylish clothing options while supporting sustainable manufacturing and fair trade.
        </p>
      </div>
    </div>
      </div>
    </div>
  )
}

export default About
