import { shallow, mount } from 'enzyme';
import LikeBtn from './LikeBtn';

describe('LikeBtn component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<LikeBtn details={{ bookId: 1, recommendedAmount: 12 }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the count and call the API when the button is clicked', () => {
    const updateRecommendAmountApi = jest.fn(() => Promise.resolve());

    const wrapper = mount(<LikeBtn details={{ bookId: 1, recommendedAmount: 12 }} />);
    const likeButton = wrapper.find('#paw-button');

    // Click the button once
    likeButton.simulate('click');
    // Check that the like button has the 'liked' class after a delay
    setTimeout(() => {
      expect(wrapper.find('.liked')).toHaveLength(1);
      expect(wrapper.find('.paw-effect')).toHaveLength(1);
      expect(wrapper.find('.paw-effect div')).toHaveLength(1);
      expect(wrapper.find('.paw-button span').at(1).text()).toBe('13');
      expect(updateRecommendAmountApi).toHaveBeenCalledWith({ book_id: 1, recommend: 1 });
    }, 1000); // delay of 1 second

    // Click the button again to cancel the like
    likeButton.simulate('click');
    setTimeout(() => {
      expect(wrapper.find('.liked')).toHaveLength(0);
      expect(wrapper.find('.paw-effect')).toHaveLength(0);
      expect(wrapper.find('.paw-button span').at(1).text()).toBe('12');
      expect(updateRecommendAmountApi).toHaveBeenCalledWith({ book_id: 1, recommend: -1 });
    }, 1000); // delay of 1 second
  });
});
