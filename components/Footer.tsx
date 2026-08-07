export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <a className="brand" href="#top">
              <span className="mark">
                <i>F</i>
              </span>
              <b>Foha</b>&nbsp;<span>Savoury</span>
            </a>
            <p
              style={{
                color: "var(--cream-dim)",
                fontSize: 14,
                maxWidth: 260,
              }}
            >
              Pure vegetable oil, refined for the way you cook.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Product</h4>
              <a href="#benefits">Benefits</a>
              <a href="#range">Our Range</a>
              <a href="#band">The Brand</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#connect">Contact</a>
              <a href="mailto:trade@fohasavoury.com">Wholesale</a>
              <a href="#connect">Stockists</a>
            </div>
            <div className="foot-col">
              <h4>Connect</h4>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Recipes</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 Foha Savoury. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
