export const FramerMotionStyles = {
    buttons: {
        whileHover: {
            scale: 1.1,
        },
        transition: {
            type: "spring",
            bounce: 0.75,
        },
    },
    navMenuItems: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
    },
    navMenu: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
    }
};


export const motionVariants = {

    // APP CARDS
    cards: {
        whileHover: {
            y: "-12px",
            transition: {
                type: "spring",
                stiffness: 200,
                mass: 0.33,
            },
            exit: {
                transition: {
                    type: "easeOut",
                },
            }
        },

    }
}

