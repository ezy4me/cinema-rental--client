export default function Loading() {
    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'transparent', 
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '6px solid rgba(0, 0, 0, 0.1)', 
        borderTop: '6px solid #f7c30f', 
        borderRadius: '50%',
        animation: 'spin 1s linear infinite', 
    },
};
