import React from 'react'

const Services = () => {
   const services = [
  {
    icon: 'fas fa-shopping-cart',
    title: 'Online Shopping',
    description: 'Shop from the comfort of your home with a seamless and secure online experience.',
  },
  {
    icon: 'fas fa-shipping-fast',
    title: 'Fast Delivery (24–72 Hours)',
    description: 'We deliver your order quickly within 1 to 3 working days across the country.',
  },
  {
    icon: 'fas fa-credit-card',
    title: 'Online Payment',
    description: 'We offer safe online payment options, including cards and digital wallets.',
  },
  {
    icon: 'fas fa-undo',
    title: '14-Day Exchange & Return',
    description: 'You can exchange or return your product within 14 days of delivery — hassle-free.',
  },
    ];
  return (
    <div>
      <div className="container py-5">
      <div className="text-center mb-5">
        <h4 className="">Our Services</h4>
        <p className="text-muted">Enjoy convenient shopping with fast delivery, easy returns, and secure payment.</p>
      </div>
      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-12 col-md-6 col-lg-3" key={index}>
            <div className="card text-center h-100 border-0 shadow-sm p-3">
              <div className="mb-3">
                <i className={`${service.icon} fa-3x text-primary`}></i>
              </div>
              <h5 className="card-title">{service.title}</h5>
              <p className="card-text text-muted">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Services
