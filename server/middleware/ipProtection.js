import geoip from 'geoip-lite';

export const ipProtection = (req, res, next) => {
  // Always allow localhost for development
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
  const ip = clientIp.split(',')[0].trim(); // x-forwarded-for can have multiple IPs
  
  if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return next();
  }

  // 1. Check strict IP Whitelist (if provided in .env)
  if (process.env.ALLOWED_ADMIN_IPS) {
    const allowedIps = process.env.ALLOWED_ADMIN_IPS.split(',').map(i => i.trim());
    if (allowedIps.includes(ip)) {
      return next(); // Explicitly allowed IP
    }
  }

  // 2. Check Country level Geolocation (default to India 'IN')
  const allowedCountries = process.env.ALLOWED_ADMIN_COUNTRIES 
    ? process.env.ALLOWED_ADMIN_COUNTRIES.split(',').map(c => c.trim().toUpperCase()) 
    : ['IN']; // Only India by default

  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : null;

  if (country && allowedCountries.includes(country)) {
    return next();
  }

  console.warn(`[SECURITY] Blocked admin access from IP: ${ip} (Country: ${country || 'Unknown'})`);
  
  return res.status(403).json({
    success: false,
    message: 'Access Denied: Your IP or location is restricted from accessing the admin panel.',
  });
};
