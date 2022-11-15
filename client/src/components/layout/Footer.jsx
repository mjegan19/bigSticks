// Import React modules
import React from 'react';
import styled from 'styled-components';

import { GiFootyField } from 'react-icons/gi';
import { GrInstagram, GrFacebook, GrTwitter, GrPinterest } from 'react-icons/gr';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaFax, FaRegBuilding, FaSitemap } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TiShoppingCart, TiContacts } from 'react-icons/ti';

const Footer = () => {
  // Dynamic Date Function
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (

  // Footer Component adapted & modified from the tutorial @
  // https://mdbootstrap.com/docs/standard/navigation/footer/

  <footer class="text-center text-lg-start bg-light text-muted mt-5">
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              <GiFootyField size={40} /> BIGSTICKS
            </h6>
            <p>
              Est minus repellendus et reprehenderit velit vel sapiente aperiam. In deleniti quas quo mollitia laudantium et earum dolores aut aliquid distinctio quo voluptas dicta sed explicabo voluptas ex dicta rerum.
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              <TiShoppingCart size={40} /> Products
            </h6>
            <p><a href="#!" class="text-reset">Create a Card</a></p>
            <p><a href="#!" class="text-reset">Stickers</a></p>
            <p><a href="#!" class="text-reset">Clothing</a></p>
            <p><a href="#!" class="text-reset">Headwear</a></p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              <FaSitemap size={40} /> Sitemap
            </h6>
            <p><a href="#!" class="text-reset">Trading Cards</a></p>
            <p><a href="#!" class="text-reset">AFL Ladder</a></p>
            <p><a href="#!" class="text-reset">About</a></p>
            <p><a href="#!" class="text-reset">Contact</a></p>
            <p><a href="#!" class="text-reset">Terms of Use</a></p>
            <p><a href="#!" class="text-reset">Privacy Policy</a></p>
            <p><a href="#!" class="text-reset">Help</a></p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              <TiContacts size={40} /> Contact
            </h6>
            <p><FaRegBuilding /> Melbourne VIC 3001, AU</p>
            <p><MdEmail /> info@bigsticks.com.au</p>
            <p><BsFillTelephoneFill /> (03) 2314 9543</p>
            <p><FaFax /> (03) 2314 5743</p>
          </div>
        </div>
      </div>
    </section>

    <section class="d-flex justify-content-center ustify-content-lg-between p-4 border-bottom">
      <div class="me-5 d-none d-lg-block">
        <span>Connect with us on our social platforms:</span>
      </div>
      <div>
        <a href="" class="me-4 text-reset"><GrFacebook size={35} /></a>
        <a href="" class="me-4 text-reset"><GrInstagram size={35} /></a>
        <a href="" class="me-4 text-reset"><GrTwitter size={35} /></a>
        <a href="" class="me-4 text-reset"><GrPinterest size={35} /></a>
      </div>
    </section>

    <div class="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>&copy; {getCurrentYear()} BIGSTICKS</div>
  </footer>
  )
}

export default Footer