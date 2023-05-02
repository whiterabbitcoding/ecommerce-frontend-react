import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from "@chakra-ui/react";

const SidebarContent = ({ onClick }: { onClick: Function }) => (
  <VStack>
    <Button w="100%">Home</Button>
    <Button w="100%">About</Button>
    <Button w="100%">Contact</Button>
  </VStack>
);

const Sidebar = ({ isOpen, variant, onClose }: any) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      bg="#dfdfdf"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );

  // const Sidebar = ({ isOpen, onClose }: Props) => {
  //   return (
  //     <Box
  //       position="fixed"
  //       left={0}
  //       p={5}
  //       w="200px"
  //       top={0}
  //       h="100%"
  //       bg="#dfdfdf"
  //     >
  //       <SidebarContent onClick={onClose} />
  //     </Box>
  //   );
  // : (
  //   <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
  //     <DrawerOverlay>
  //       <DrawerContent>
  //         <DrawerCloseButton />
  //         <DrawerHeader>Chakra-UI</DrawerHeader>
  //         <DrawerBody>
  //           <SidebarContent onClick={onClose} />
  //         </DrawerBody>
  //       </DrawerContent>
  //     </DrawerOverlay>
  //   </Drawer>
  // );
};

export default Sidebar;
