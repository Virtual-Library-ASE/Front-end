import { shallow } from 'enzyme';
import AgreementModel from './Register';
import { Modal } from "antd";

describe('AgreementModel Component', () => {
  let wrapper;
  const props = {
    isAgreement: true,
    setAgreement: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<AgreementModel {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render Modal component', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

});
