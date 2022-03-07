# booking

## Deployment

Fehler:

	internal/modules/cjs/loader.js:1057
	  return process.dlopen(module, path.toNamespacedPath(filename));
	                 ^
	
	Error: /var/www/booking/backend/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node: invalid ELF header
	    at Object.Module._extensions..node (internal/modules/cjs/loader.js:1057:18)
	    at Module.load (internal/modules/cjs/loader.js:863:32)
	    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
	    at Module.require (internal/modules/cjs/loader.js:887:19)
	    at require (internal/modules/cjs/helpers.js:74:18)
	    at Object.<anonymous> (/var/www/booking/backend/node_modules/bcrypt/bcrypt.js:6:16)
	    at Module._compile (internal/modules/cjs/loader.js:999:30)
	    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
	    at Module.load (internal/modules/cjs/loader.js:863:32)
	    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
	    
	    
Lösung:

	npm uninstall bcrypt
	npm i bcrypt

firewall.sh

iptables -A INPUT -p tcp --dport 4000 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 4000 -j ACCEPT

iptables -A INPUT -p tcp --dport 4200 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 4200 -j ACCEPT
