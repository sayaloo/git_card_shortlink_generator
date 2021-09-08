import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${props => props.color};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  .avatar{
    max-width: 100%;
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  
  .card-header{
    border-bottom: 15px double ${props => props.color};
  }
  
  .stars-wrp{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-right: 10px;
    svg{
      stroke: ${props => props.color};
      width: 50px;
      height: 50px;
      
    }
  }
  
  
  .contributor-cnt{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    .contributor{
      display: inline-block;
      padding: 5px 10px;
      border-radius: 7px;
      margin: 10px 5px;
      background-color: ${props => props.color};
      &:first-child{
        margin-left: 0;
      }
    }
  }
`;

export { CardContainer };