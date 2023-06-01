const Footer = () => {
  return (
    <footer id="universal_footer">
      <div className="universal_footer_container">
        <div className="universal_footer_container_div">
          <section>
            <ul>
              <li>About Us</li>
              <li>Feedback</li>
              <li>Community</li>
            </ul>
          </section>

          <section>
            <ul>
              <li>Trust, Safety, & Security</li>
              <li>Help & Support</li>
              <li>Upwork Foundation</li>
            </ul>
          </section>

          <section>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Settings</li>
              <li>Cookie Policy</li>
            </ul>
          </section>
        </div>

        <div className = "border-visible"></div>

      <div className="universal_footer_container_div">
        <section className="footer_social_icons">
          <h3>FOLLOW US</h3>
          <div>
            <i className="fas fa-arrow-right"></i>
            <i className="fas fa-arrow-right"></i>
            <i className="fas fa-arrow-right"></i>
            <i className="fas fa-arrow-right"></i>
          </div>
        </section>

        <div className="border"></div>

        <section>
          <p>2015 - 2023 Upwork® Global Inc.</p>
        </section>
      </div>
    </div>
</footer>
  )  
}
export default Footer;