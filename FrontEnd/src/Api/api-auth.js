const register = async (user) => {
    try {
        let resp = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        return await resp.json();
    } catch (err) {
        console.log(err);
    }
};

const login = async (user) => {
    try {
        let resp = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        return await resp.json();
    } catch (err) {
        console.log(err);
    }
};

export { register, login };
