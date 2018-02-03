import { TimelineMax, TweenMax } from 'gsap';

export const fileDropAni = component => {
  let loadingBlip;
  component.setState({enable: false})
  const tl = new TimelineMax(); // initial transition
  tl.to(".DropZone", .7, {
    height: '10vh',
    width: '80vw',
    borderRadius: "20vh"
  }).to('p', .5, {opacity: 0})
  let its = 0;
  setTimeout(() => {
    component.setState({ dropMessage: 'Loading' })
    tl.to('p', .5, { opacity: 1 })
    loadingBlip = setInterval(() => {
      let dotCount = its % 4;
      let dropMessage = `Loading${".".repeat(dotCount)}`;
      component.setState({ dropMessage });
      its++;
    }, 500)
    const tl2 = new TimelineMax();
    tl2.to(".DropZone", 3, {
      backgroundPosition: 'left bottom',
      ease: 'linear'
    });
  }, 1200)

  setTimeout(() => { // loading bar transition
    clearInterval(loadingBlip);
    component.setState({enable: true, dropMessage: "Loading... Complete!"})
    tl.to('.DropZone', .7, { borderRadius: '0' }, '+=.5')
      .to('.DropZone', 1, {
         height: '80vh',
         width: '80vh',
         backgroundPosition: 'right bottom'
       })
      .to('p', 1, { top: '5%', left: '1%'})
      .to('.FileList', 1, { opacity: 1 }, '+=1' )
    setTimeout(() => {
      TweenMax.set('.ButtonContainer', { bottom: '4%', left:'3%', position: 'absolute' })
      TweenMax.set('.StandardButton2',{ opacity: 1 })
      component.setState({ dropMessage: 'Loaded Files:', display: "" })
    }, 3000)
  }, 4000)
}
