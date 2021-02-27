import { domSelect, getData } from './util/util.js';
import { moreParser, slideParser, hotDealParser } from './util/parser.js';
import BannerSlide from './bannerSlide.js';
import More from './moreBtn.js';
import HotDealSlide from './hotDealSlide.js';
import { URL } from './util/data.js';

//슬라이드 DOM
const slideContainer = domSelect('.slide');
const slideList = domSelect('.slide-list');
const bannerSlideBtn = domSelect('.slide-event__btn');
const pagingBtn = domSelect('.slide-event__paging');
const BannerSelector = { container: slideContainer, slideList, slideBtn: bannerSlideBtn, pagingBtn };
const BannerAnimation = { oneStep: 515, transition: 'all 0.3s' };

//더보기 DOM
const moreContainer = domSelect('.more-container');
const moreBtn = domSelect('.more-text-container');
const moreSelectors = { container: moreContainer, moreBtn };

//핫딜 슬라이드 DOM
const hotDealContainer = domSelect('.hot-deal__container');
const hotDealSlideList = domSelect('.hot-deal-list');
const hotDealBtn = domSelect('.hot-deal .slide-event__btn');
const hotDealSelector = { container: hotDealContainer, slideList: hotDealSlideList, slideBtn: hotDealBtn };
const hotDealAnimation = { oneStep: 260.6, transition: 'all 0.3s' };

//슬라이더
getData(URL.SLIDE).then((res) => {
  const { mileageList: slideData, mallEventList: hotDealData } = res;

  const parsedBannerdata = slideParser(slideData);
  const bannerSlide = new BannerSlide(parsedBannerdata, BannerSelector, BannerAnimation);
  bannerSlide.init();

  const parsedHotDealData = hotDealParser(hotDealData);
  const hotDealSlide = new HotDealSlide(parsedHotDealData, hotDealSelector, hotDealAnimation);
  hotDealSlide.init();
});

// 더보기;
getData(URL.MORE).then((res) => {
  const { contents: moreData } = res;
  const parsedMoreData = moreParser(moreData);
  const more = new More(parsedMoreData, moreSelectors);
  more.init();
});
