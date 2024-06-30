import Cafe from "../../../assets/images/cafe.svg";
import Forward from "../../../assets/images/geometric-icons/forward.svg";

export default function renderCafePage(main) {

  main.innerHTML = `
    <div class="cafe">

      <div class="cafe__button">
        <button class="cafe__button-icon"></button>
      </div>

      <div class="cafe__box">
        <div class="cafe-box__element-title">
          <p class="cafe-box__element-text">Select Magic Coffee store</p>
        </div>

        <div class="cafe-box__element-wrap">

          <div class="cafe-box__element">

            <div class="cafe-box__button">
              <div class="cafe-box__button-icon">
                <img src='${Cafe}' alt='Cafe' />
              </div>
    
              <div class="cafe-box__button-title">Bradford BD4 7SJ</div>
    
              <div class="cafe-box__button-arrow">
                <img src='${Forward}' alt='Arrow' />
              </div>
            </div>

            <div class="cafe-box__button">
              <div class="cafe-box__button-icon">
                <img src='${Cafe}' alt='Cafe' />
              </div>
    
              <div class="cafe-box__button-title">Bradford BD4 7SJ</div>
    
              <div class="cafe-box__button-arrow">
                <img src='${Forward}' alt='Arrow' />
              </div>
            </div>

            <div class="cafe-box__button">
              <div class="cafe-box__button-icon">
                <img src='${Cafe}' alt='Cafe' />
              </div>
    
              <div class="cafe-box__button-title">Bradford BD4 7SJ</div>
    
              <div class="cafe-box__button-arrow">
                <img src='${Forward}' alt='Arrow' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

renderCafePage(main);

