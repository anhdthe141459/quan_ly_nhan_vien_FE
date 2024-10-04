import React, { useState,useEffect } from 'react';
import { Button, Space,Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer,closeDrawer } from '../../redux/slices/isOpenDrawerSlice';
const DrawerComponent = (props) => {
  const {textButton,content,title}=props;
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isOpenDrawerState.isOpen);
  const [open, setOpen] = useState(isOpen);

  
  console.log("open=========",open)
  const showDrawer = () => {
     setOpen(true);
     dispatch(openDrawer());
  };
  const onClose = () => {
    dispatch(closeDrawer()); 
    setOpen(false);
  };
  const check = (val) =>{
    setOpen(val);
  }
  useEffect(() => {
    if(isOpen) return
    console.log("check useEffect")
    check(isOpen);
  }, [isOpen]); 
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
          {textButton}
      </Button>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
};
export default DrawerComponent;